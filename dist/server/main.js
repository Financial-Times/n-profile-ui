"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
const helpers = require("../helpers");
exports.helpers = helpers;
const n_user_api_client_1 = require("@financial-times/n-user-api-client");
async function getFormOfWords(name, scope = 'FTPINK') {
    if (!process.env.FOW_API_HOST) {
        throw new Error('Missing FOW_API_HOST environment variable');
    }
    const url = `${process.env.FOW_API_HOST}/api/v1/${scope}/${name}`;
    const fow = await fetch(url, {
        timeout: 2000
    });
    return await fow.json();
}
exports.getFormOfWords = getFormOfWords;
function getConsentRecord(uuid, source, mode = 'PROD', scope = 'FTPINK') {
    const api = new n_user_api_client_1.UserConsent(uuid, source, mode, scope);
    return api.getConsentRecord();
}
exports.getConsentRecord = getConsentRecord;
function saveConsent(uuid, consentRecord, source, mode = 'PROD', scope = 'FTPINK') {
    const api = new n_user_api_client_1.UserConsent(uuid, source, mode, scope);
    const category = Object.keys(consentRecord)[0];
    const channel = Object.keys(consentRecord[category])[0];
    const consent = consentRecord[category][channel];
    return api.updateConsent(category, channel, consent);
}
exports.saveConsent = saveConsent;
function createConsentRecord(uuid, consentRecord, source, mode = 'PROD', scope = 'FTPINK') {
    const api = new n_user_api_client_1.UserConsent(uuid, source, mode, scope);
    return api.createConsentRecord(consentRecord);
}
exports.createConsentRecord = createConsentRecord;
function updateConsentRecord(uuid, consentRecord, source, mode = 'PROD', scope = 'FTPINK') {
    const api = new n_user_api_client_1.UserConsent(uuid, source, mode, scope);
    return api.updateConsentRecord(consentRecord);
}
exports.updateConsentRecord = updateConsentRecord;
