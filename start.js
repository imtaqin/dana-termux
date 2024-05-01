import dotenv from 'dotenv';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { spawn } from 'child_process';
import cron from 'node-cron';
import inquirer from 'inquirer';
import { getProfile } from './src/function/getProfile.js';
import { getTrxDetails } from './src/function/getDetailTrx.js';
import { getTrxHistory } from './src/function/getTransaction.js';
dotenv.config();


const SHEET_NAME = 'Dana';
let SPREADSHEET_ID;
let sessionId;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, 'cred.json');

const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const questions = [
    {
        type: 'input',
        name: 'sheetId',
        message: 'Enter the Google Sheet ID:',
        validate: function (value) {
            var pass = value.match(/^[a-zA-Z0-9-_]+$/);
            if (pass) {
                return true;
            }
            return 'Google Sheet ID.';
        }
    }
];

const answers = await inquirer.prompt(questions);
SPREADSHEET_ID = answers.sheetId;

async function updateDataInSheet(auth, range, values) {
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: values,
        },
    });
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getDataFromSheet(auth, range) {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
    });
    return response.data.values || [];
}
async function appendDataToSheet(auth, range, values) {
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: values,
        },
    });
}
let globalSessionId = null;

async function runFridaScript() {
    try {
        console.log('Running Frida script on id.dana...');
        const sessionId = await execShellCommand('frida -H 127.0.0.1 -f id.dana -l bypass.js');
        globalSessionId = sessionId; 
        console.log('SESSION ID: ' + sessionId + '\n');
        return true;
    } catch (error) {
        console.error('Failed to run Frida script on id.dana.');
        console.error(error);
        return false;
    }
}
async function pushtoSheet() {
    console.log("Starting push to sheet... with sessionId: " + sessionId);
    try {
        const client = await auth.getClient();
        const cookie = sessionId;
        const profile = await getProfile(cookie);
        const trxHistory = await getTrxHistory(cookie);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-11, where 0 is January and 11 is December
        const namaDana = profile.result.nickname;
        const profileData = [['Last Balance:', formatAmount(profile.result.balanceDisplay.amount)]];
        await updateDataInSheet(client, `${SHEET_NAME}!B2`, profileData);
        fs.writeFileSync('history.json', JSON.stringify(trxHistory));
        const existingTransactions = await getDataFromSheet(client, `${SHEET_NAME}!B5:B`);
        const existingBizOrderIds = existingTransactions.flat();

        for (const trx of trxHistory.result.transactionListItemDTOs) {
            //console.log(trx);
            if (!existingBizOrderIds.includes(trx.bizOrderId)) {
                const transactionDate = new Date(trx.orderCreatedTime);
                const transactionMonth = transactionDate.getMonth();

                 if (transactionMonth === currentMonth) {
                const detail = await getTrxDetails(cookie, trx.bizOrderId, trx.paymentOrderId);
                let name = detail.result?.transactionDetailItemDTO?.orderTitle ? extractMandiriMutationName(detail.result.transactionDetailItemDTO.orderTitle) ?? detail.result.transactionDetailItemDTO.orderTitle : "";
                let amount = trx.userPaidAmount?.amount ? trx.userPaidAmount.amount : trx.totalAmount?.amount ?? "";
                let nominal = "";
                let keluar = "";
                const totalAmount = parseInt(trx.totalAmount?.amount.replace('.', '') ?? "0");
                const userPaidAmount = parseInt(trx.userPaidAmount?.amount.replace('.', '') ?? "0");
                
                // Calculate cost
                let cost = totalAmount - userPaidAmount; // This will now correctly calculate the cost in the smallest currency unit
        
                if (totalAmount && userPaidAmount) {
                    cost = totalAmount - userPaidAmount;
                }
                if (trx.inOut === 'IN') {
                    nominal = formatAmount(amount);
                } else if (trx.inOut === 'OUT') {
                    keluar = formatAmount(amount);
                }
                
                console.log("nominal: " + nominal);
                console.log("keluar: " + keluar);
                console.log("cost: " + cost);

                const transactionData = [[
                    namaDana, // Assuming defined elsewhere
                    trx.bizOrderId,
                    trx.bizOrderType,
                    transactionDate.toISOString(),
                    new Date().toISOString(),
                    detail.result?.transactionDetailItemDTO?.instName ?? "",
                    trx.orderTitle,
                    name,
                    nominal,
                    keluar,
                    cost.toLocaleString()
                ]];
                await appendDataToSheet(client, `${SHEET_NAME}!A5:K`, transactionData); 
                await sleep(5000); 

                 }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const formatAmount = (amount) => {
    return amount.replace(/\./g, ',');
};
function extractMandiriMutationName(name) {
    const regex = /(?:ke|dari)(.+)/;
    const match = name.match(regex);
    return match ? match[1] : null;
}

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


async function runFridaScriptFirst() {
    try {
        console.log('Running Frida script on id.dana...');
        const output = await execShellCommand('frida -H 127.0.0.1 -f id.dana -l bypass.js');
    
        console.log('SESSION ID: ' + output + '\n');
        sessionId = output;
        return true;
    } catch (error) {
        console.log(error);
        console.log('Failed to run Frida script on id.dana.');
        return false;
    }
}

runFridaScriptFirst().then(success => {
    if (success) {
        setInterval(() => {
            console.log('Running Frida script on id.dana...');
            runFridaScriptFirst().catch(console.error); 
        }, 100000);

        setInterval(async() => {
            console.log('Pushing to Google Sheet...');
            await pushtoSheet(sessionId).catch(console.error);
        },10000);

        console.log('Interval set for 10 second minutes for pushing to Google Sheet.');
    }
});

