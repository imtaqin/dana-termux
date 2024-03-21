import got from 'got';

const gotInstance = got.extend({
    http2: true,
    https: {
        minVersion: 'TLSv1.3',
        maxVersion: 'TLSv1.3',
    },
});
async function makeRequest(url, postFields, headers) {
    try {
        const response = await gotInstance.post(url, {
            json: postFields,
            headers: headers,
        });
        return response.body; 
    } catch (error) {
        throw error; 
    }
}

export default makeRequest;