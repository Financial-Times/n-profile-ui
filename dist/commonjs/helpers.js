'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Rx = /\b(lbi|consent)-(\w+)-(\w+)\b/;
function isConsentField (name) {
	return Rx.test(name);
}
exports.isConsentField = isConsentField;
function extractMetaFromString (name) {
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
function decorateChannel (options) {
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
function populateConsentModel (options) {
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
function validateConsent (fow, category, channel) {
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
function buildConsentRecord (fow, keyedConsents, source) {
	let consentRecord;
	const { id: fowId } = typeof fow === 'string' || !fow ? { id: fow } : fow;
	if (!fow || !fowId) {
		throw new Error('Missing form of words (fow) id');
	}
	if (!source) {
		throw new Error('Missing consent source');
	}
	for (let key of Object.keys(keyedConsents)) {
		const value = keyedConsents[key];
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
function updateConsentCookie (consent, cookieOptions = {
	name: 'FTConsent',
	path: '/',
	domain: '.ft.com',
	maxAge: 30 * 24 * 60 * 60 * 1000
}) {
	const category = Object.keys(consent)[0];
	const channel = Object.keys(consent[category])[0];
	const status = consent[category][channel].status;
	const cookieFlag = normaliseCookieFlag(category, channel);
	const { name, path, domain, maxAge } = cookieOptions;
	const cookieValues = parseConsentCookie(name) || {};
	Object.assign(cookieValues, { [cookieFlag]: status });
	const cookie = [
		`${name}=${serializeCookie(cookieValues)}`,
		`domain=${domain}`,
		`path=${path}`,
		`max-age=${maxAge}`
	];
	document.cookie = cookie.join('; ');
}
exports.updateConsentCookie = updateConsentCookie;
function parseConsentCookie (name) {
	const rx = new RegExp(`${name}=(.*?);`);
	const matched = document.cookie.match(rx);
	if (!matched) {
		return null;
	}
	const [, cookie] = matched;
	const consents = cookie.split(',').reduce((acc, consentExpression) => {
		const [flag, state] = consentExpression.split(':');
		if (flag && state) {
			acc[flag] = state === 'on';
		}
		return acc;
	}, {});
	return Object.keys(consents).length ? consents : null;
}
function normaliseCookieFlag (category, channel) {
	function ucFirst (str) {
		return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
	}
	return `${category.toLowerCase()}${ucFirst(channel.toLowerCase())}`;
}
function serializeCookie (cookieObject) {
	return Object.keys(cookieObject)
		.map(cookieFlag => `${cookieFlag}:${cookieObject[cookieFlag] ? 'on' : 'off'}`)
		.join(',');
}
