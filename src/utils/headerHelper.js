/**
 * Creates headers for the profile using the given cookie.
 *
 * @param {string} cookie - the session cookie
 * @return {object} the headers for the profile
 */
export const makeHeadersProfile = (cookie) => {
    return  {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${cookie}; oneDayId=3501064519; QuickUserData=; ALIPAYJSESSIONID=${cookie}; ctoken=3JasUT2jVLPMkNok; AKA_A2=A; userId=216610000013331248115; bm_sv=8E8D0FA1148F47A8015926D966A56D51~YAAQZh0gF4qyj0qLAQAAzOrYWBXAAY8LH3QruXbxiUmWpxRmT0Fc7jj56USPH63QtHNPs0nqHKst9aHzbEyezjkiAmXqMZ33A8psPpOCqbqvezOcqCdcB6kFl7K1ip24I3oUpVf++9F0tIyujvESbhCKB3a2yCrcBukkQYrJIFzU0Na58crwQ+CZDKT75VitmTgNAypagGUaOkJflNdUZaeE3FuZmXl8nsuVFuWiEcQC4lINVQ9v2z7KC9kG~1; _abck=90B4EBEEF0251F6CC715AE321DD44465~0~YAAQZh0gF5iyj0qLAQAAU+3YWApVhUCw3+r/B6xd7MC27fZ/yKVsUamOgsvbEHJ3WudGt7Daihv6kmATabqZIfl6WabC40T7SZ+bkFm0N/U1gzE3rorH3zOzajk75OzzXK79l96h4VJUrP3juxIPtvH/ivafF1x8DGL252c3cmvmyKCanjTUJJp//OIdOmhr/ulUZbhg1FZCx4a6Nb28gEbbyij8wpVpygZLEzcYkKReVi5AZrbfDxdm6mCRig/zvAQGmX8J4jtryM9v+lGP968rUxCcUOv/uTtKLSvulC7Q3RPxEUSIlTSPa1Ui+kqg6qatpyd2Jyd4HZ1iHcmPEGi8Vm0nfXex0pee4GsNZMDGxcj6ZAmzrPoVNNSQRidOykqhvrJ2HX+rGFhdFaQnyiAxo/2z~-1~||-1||~-1; _abck=F80AEC2E0D4809FB39C08A78C954DA91~-1~YAAQvgMKcuT3sNKNAQAA53tu1wumt0SFk7ie8ClYJZu+2konkbwYl0XGu3uocYj365agoXiMcTkXP6QIE5iDisE0X1hCPhGgjSaIVev7SylLdr2nXoC/1SUNLu+EhBhSPgMtvC8FBR+hPJPS6HOY+JIPGf14PJ4JJ2QBRd61ls0fxUZnP+gRsxDsTSXcMcCtcK2D7ZUWfZSPV3LFfJE3QMgrEcgjJhLRlJJ6vqBVm0aakM0LWj6xRjSatQS05Qr9nVEAoLfZKDG6K5h/X3+0mBBXaPBCKd1A/+MwRTd/zgwgzEk3IORHcBMRJs1YQV+fQMouFQwkW5WoQsG55/AqmDv3wWK5GYSQaIG97Jpb4x1aqmDY/2c+gh3o~-1~-1~-1; oneDayId=3501064519`,
            'Origin': 'https://m.dana.id',
            'referer': 'https://m.dana.id/i/transaction/list/completed',
            'user-agent': 'Skywalker/2.51.1 EDIK/1.0.0 Dalvik/2.1.0 (Linux; U; Android 7.1.2; SM-N960N Build/N2G48B) Ariver/2.52.0 LocalKit/1.5.1.3 Lang/id-ID okhttp/3.12.12',
            'x-fe-version': '1.82.0'
        };
    
}

export const makeTrxHeader = (cookie) => {
    return {
        'content-type': 'application/json',
        'cookie': `ALIPAYJSESSIONID=${cookie}; ctoken=ilkC-U3urCBoIRks; userId=216610000013331248115; session.cookieNameId=ALIPAYJSESSIONID; ak_bmsc=BACDD1357332D591C3A93FDFE39BD36F~000000000000000000000000000000~YAAQ2UvWFwASupmNAQAAWGdbnhbeEOgYjUFGe/iERmBRsGzpX1NgCbx7WJTzs1e7yRH9arvA94ZCXJZgvcrvkK/a2iUqdKTxeAvZMxvrbuM4EOoYSI61fmbkfminFngHCdsbQwbNCQ2X1DJ0YXctb6G9urZuYTAVGKSo6o0VN2paAEn9FJ0Rx+u6j9tjmXvJXPHpCL3V/n+PszOGE+e0scdFZ/UTNte1sGc08ms9eUbBj8D4U9AfC3KR0mOBaPOBAIrUSF7JfisAYRyH3zPYd4GEUM1EzTub4W5zUdQ8Wl69p0pA6fTH2Z2eof/2S+rC54U2D6j7QysBGwcqtl2Yx/28GjdSfXmi0kULzjU3fOvpEgon/WyQyZA=; oneDayId=4010701561`,
        'Origin': 'https://m.dana.id',
        'user-agent': 'Skywalker/2.51.1 EDIK/1.0.0 Dalvik/2.1.0 (Linux; U; Android 7.1.2; SM-N960N Build/N2G48B) Ariver/2.52.0 LocalKit/1.5.1.3 Lang/id-ID okhttp/3.12.12',
        'x-fe-version': '1.82.0'
    };
}