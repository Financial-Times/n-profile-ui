import { FowAPI } from './types/fow-api';
import { ConsentAPI } from './types/consent-api';
import { ConsentModelData } from './types/helpers';

const Rx = /\b(lbi|consent)-(\w+)-(\w+)\b/;

export function isConsentField(name: string): boolean {
	return Rx.test(name);
}

export function extractMetaFromString(
	name: string
): ConsentModelData.Radio | null {
	// extracts channel, category and lbi from strings like:
	// lbi-categoryName-channelName
	// consent-categoryName-channelName
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

interface ElementAttr {
	name: string;
	value?: string | boolean | number;
}

interface DecorateChannelArgs {
	fowChannel: FowAPI.Channel;
	consentChannel?: ConsentAPI.Channel;
	elementAttrs?: Array<ElementAttr>;
}

export function decorateChannel(
	options: DecorateChannelArgs
): ConsentModelData.Channel {
	// adds checkedYes and checkedNo to a FoW channel object
	let { fowChannel, consentChannel, elementAttrs } = options;

	let checkedYes: boolean = false;
	let checkedNo: boolean = false;

	if (consentChannel) {
		checkedYes = consentChannel.status;
		checkedNo = !checkedYes;
	} else if (fowChannel.lbi) {
		checkedYes = true;
	}

	return Object.assign(fowChannel, {
		checkedYes,
		checkedNo,
		elementAttrs
	});
}

interface PopulateConsentModelArgs {
	fow: FowAPI.Fow;
	source: string;
	consent?: ConsentAPI.Record | ConsentAPI.Channel | null;
	elementAttrs?: Array<ElementAttr>;
}

export function populateConsentModel(
	options: PopulateConsentModelArgs
): FowAPI.Fow {
	// returns a populated model for the consent view
	// based on a FoW and a consent record or unit
	let { fow, source, consent, elementAttrs } = options;

	const getConsent = (category: string, channel: string) =>
		!consent || consent.hasOwnProperty('fow')
			? consent
			: (consent[category] || {})[channel];

	fow.source = source;
	fow.consents = fow.consents.map(
		(categoryObj: FowAPI.Category): FowAPI.Category => {
			categoryObj.channels.map((channelObj: FowAPI.Channel): FowAPI.Channel =>
				decorateChannel({
					fowChannel: channelObj,
					consentChannel: getConsent(categoryObj.category, channelObj.channel),
					elementAttrs
				})
			);
			return categoryObj;
		}
	);
	return fow;
}

export function validateConsent(
	fow: string | FowAPI.Fow,
	category: string,
	channel: string
): boolean {
	// checks that the scope, category and channel
	// match the form of words
	// if fow is an object
	if (typeof fow === 'string') {
		return true;
	}
	const categoryObj = fow.consents.find(
		categoryObj => categoryObj.category === category
	);
	if (!categoryObj) {
		throw new Error(`Category ${category} does not match form of words`);
	}
	const validChannel = categoryObj.channels.some(
		channelObj => channelObj.channel === channel
	);
	if (!validChannel) {
		throw new Error(`Channel ${channel} does not match form of words`);
	}
	return true;
}

export function buildConsentRecord(
	fow: string | FowAPI.Fow | null,
	keyedConsents: ConsentModelData.KeyedValues,
	source?: string
): ConsentAPI.Record {
	// builds a consent record
	// based on a form of words, source
	// and keyedConsents:
	// {
	// 	lbi-categoryName-channelName: 'yes',
	// 	consent-categoryName-channelName: 'no'
	// }

	// consents will be validated against form of words
	// if fow is a form of words object
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

interface CookieOptions {
	name: string;
	path: string;
	domain: string;
	maxAge: number;
}

// helper method compatible with the enhanced experience
// onChange callback of any client-side classes which extend Consent
// callback(consent, e) { return updateConsentCookie(consent); }
export function updateConsentCookie(
	consent: ConsentAPI.Record,
	cookieOptions: any = {
		name: 'FTConsent',
		path: '/',
		domain: '.ft.com',
		maxAge: 30 * 24 * 60 * 60 * 1000
	}
) {
	// destructure category, channel and status from consent
	const category = Object.keys(consent)[0];
	const channel = Object.keys(consent[category])[0];
	const status = consent[category][channel].status;

	// normalise cookie flag
	// recommendedContent.onsite -> recommendedcontentOnsite
	const cookieFlag = normaliseCookieFlag(category, channel);

	const { name, path, domain, maxAge } = cookieOptions;
	const cookieValues = parseConsentCookie(name) || {};

	// overwrite existing value in cookie
	// if it exists
	Object.assign(cookieValues, { [cookieFlag]: status });

	const cookie = [
		`${name}=${serializeCookie(cookieValues)}`,
		`domain=${domain}`,
		`path=${path}`,
		`max-age=${maxAge}`
	];

	document.cookie = cookie.join('; '); // RFC says space after semicolon
}

interface UnmarshalledCookie {
	[x: string]: boolean;
}

function parseConsentCookie(name: string): UnmarshalledCookie | null {
	const rx = new RegExp(`${name}=([^;]*)`);
	const matched = document.cookie.match(rx);

	if (!matched) {
		return null;
	}

	const [, cookie] = matched;

	// cookie is the cookie value
	// e.g. recommmendedcontentOnsite:on,demographicadsOnsite:off
	// will be unmarshalled as
	// { recommmendedcontentOnsite: true, demographicadsOnsite: false }
	const consents = cookie.split(',').reduce((acc, consentExpression) => {
		const [flag, state] = consentExpression.split(':');
		if (flag && state) {
			acc[flag] = state === 'on';
		}
		return acc;
	}, {});

	return Object.keys(consents).length ? consents : null;
}

function normaliseCookieFlag(category: string, channel: string): string {
	function ucFirst(str: string) {
		return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
	}

	return `${category.toLowerCase()}${ucFirst(channel.toLowerCase())}`;
}

function serializeCookie(cookieObject: UnmarshalledCookie): string {
	return Object.keys(cookieObject)
		.map(
			cookieFlag => `${cookieFlag}:${cookieObject[cookieFlag] ? 'on' : 'off'}`
		)
		.join(',');
}
