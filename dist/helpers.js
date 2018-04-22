"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = /\b(lbi|consent)-(\w+)-(\w+)\b/;
function isConsentField(name) {
    return Rx.test(name);
}
exports.isConsentField = isConsentField;
function extractMetaFromString(name) {
    const match = Rx.exec(name);
    if (!match) {
        return null;
    }
    const [, fieldType, category, channel] = match;
    const lbi = fieldType === 'lbi';
    return {
        lbi,
        channel,
        category
    };
}
exports.extractMetaFromString = extractMetaFromString;
function decorateChannel(options) {
    let { fowChannel, consentChannel, elementAttrs } = options;
    let checkedYes = false;
    let checkedNo = false;
    if (consentChannel) {
        checkedYes = consentChannel.status;
        checkedNo = !checkedYes;
    }
    else if (fowChannel.lbi) {
        checkedYes = true;
    }
    return Object.assign(fowChannel, {
        checkedYes,
        checkedNo,
        elementAttrs
    });
}
exports.decorateChannel = decorateChannel;
function populateConsentModel(options) {
    let { fow, source, consent, elementAttrs } = options;
    const getConsent = (category, channel) => !consent || consent.hasOwnProperty('fow')
        ? consent
        : (consent[category] || {})[channel];
    fow.source = source;
    fow.consents = fow.consents.map((categoryObj) => {
        categoryObj.channels.map((channelObj) => decorateChannel({
            fowChannel: channelObj,
            consentChannel: getConsent(categoryObj.category, channelObj.channel),
            elementAttrs
        }));
        return categoryObj;
    });
    return fow;
}
exports.populateConsentModel = populateConsentModel;
function validateConsent(fow, category, channel) {
    if (typeof fow === 'string') {
        return true;
    }
    const categoryObj = fow.consents.find(categoryObj => categoryObj.category === category);
    if (!categoryObj) {
        throw new Error(`Category ${category} does not match form of words`);
    }
    const validChannel = categoryObj.channels.some(channelObj => channelObj.channel === channel);
    if (!validChannel) {
        throw new Error(`Channel ${channel} does not match form of words`);
    }
    return true;
}
exports.validateConsent = validateConsent;
function buildConsentRecord(fow, keyedConsents, source) {
    let consentRecord;
    const { id: fowId } = typeof fow === 'string' || !fow ? { id: fow } : fow;
    if (!fow || !fowId) {
        throw new Error('Missing form of words (fow) id');
    }
    if (!source) {
        throw new Error('Missing consent source');
    }
    for (let [key, value] of Object.entries(keyedConsents)) {
        const consent = extractMetaFromString(key);
        if (consent) {
            const { category, channel, lbi } = consent;
            if (validateConsent(fow, category, channel)) {
                consentRecord = consentRecord || {};
                consentRecord[category] = consentRecord[category] || {};
                consentRecord[category][channel] = {
                    status: value === 'yes',
                    lbi,
                    source,
                    fow: fowId
                };
            }
        }
    }
    if (!consentRecord) {
        throw new Error('Found no valid consents');
    }
    return consentRecord;
}
exports.buildConsentRecord = buildConsentRecord;
