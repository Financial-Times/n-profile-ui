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
