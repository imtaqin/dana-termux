import { spawn } from 'child_process';
import readline from 'readline';
import chalk from 'chalk'; // For colored and styled text
import clipboardy from 'clipboardy'; // For copying text to clipboard

function execShellCommand(cmd, args = []) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { shell: true });
        let foundSessionId = false;

        child.stdout.on('data', (data) => {
            if (!foundSessionId) {
                const sessionIdPattern = /ALIPAYJSESSIONID=([A-Z0-9]+danabizplugin[A-Z0-9]+)/;
                const match = data.toString().match(sessionIdPattern);
                if (match) {
                    foundSessionId = true;
 
                    child.kill(); 
                    resolve(match[1]);
                    return;
                }
            }
        });

        child.stderr.on('data', (data) => {
//            console.error(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            if (!foundSessionId) reject(new Error('Session ID not found'));
        });
    });
}

async function runFridaScript() {
    try {
        console.log('Running Frida script on id.dana...');
        const output = await execShellCommand('frida -H 127.0.0.1 -f id.dana -l bypass.js');
        console.log(chalk.bold.blue(`Session ID: ${output}`)); //
        clipboardy.writeSync(output); 
        console.log(chalk.green('klik ENTER untuk mengcopy')); 
        return output;
    } catch (error) {
  //      console.error(chalk.red('Failed to run Frida script on id.dana.'));
    //    console.error(chalk.red(error.message));
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'space') {
        runFridaScript();
    } else if (key.name === 'return') {
        console.log(chalk.yellow('Session ID copied to clipboard.'));
    }
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
});

console.log('klik SPASI untuk mendapatkankan session id');

process.stdin.resume();
