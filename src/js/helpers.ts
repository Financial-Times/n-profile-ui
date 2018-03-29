import { FowAPI } from './types/fow-api';
import { ConsentAPI } from './types/consent-api';
import { ConsentModelData } from './types/helpers';

const Rx = /\b(lbi|consent)-(\w+)-(\w+)\b/g;

function extractMetaFromString(name: string): ConsentModelData.Radio | null {
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

function transformInputChannel(
	fowChannel: FowAPI.Channel,
	consentChannel?: ConsentAPI.Channel
): ConsentModelData.Channel {
	// adds checkedYes and checkedNo to a FoW channel object
	const checkedYes = consentChannel
		? consentChannel.status
		: fowChannel.lbi || false;

	return Object.assign(fowChannel, {
		checkedYes,
		checkedNo: !checkedYes
	});
}

function populateConsentModel(
	fow: FowAPI.Fow,
	consent?: ConsentAPI.Record | ConsentAPI.Channel
): FowAPI.Fow {
	// returns a populated model for the consent view
	// based on a FoW and a consent record or unit
	fow.consents = fow.consents.map(
		(categoryObj: FowAPI.Category): FowAPI.Category => {
			categoryObj.channels.forEach(
				(channelObj: FowAPI.Channel, key: number): FowAPI.Channel =>
					consent
						? transformInputChannel(
							channelObj,
							consent.hasOwnProperty('fow')
								? consent
								: consent[categoryObj.category][channelObj.channel]
						)
						: transformInputChannel(channelObj)
			);
			return categoryObj;
		}
	);
	return fow;
}

function validateConsent(
	fow: string | FowAPI.Fow,
	scope: string,
	category: string,
	channel: string
): boolean {
	// checks that the scope, category and channel
	// match the form of words
	// if fow is an object
	if (typeof fow === 'string') {
		return true;
	}
	if (scope !== fow.scope) {
		throw new Error(`Scope ${scope} does not match form of words`);
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
	if (!categoryObj) {
		throw new Error(`Channel ${channel} does not match form of words`);
	}
	return true;
}

function buildConsentRecord(
	fow: string | FowAPI.Fow,
	scope: string,
	keyedConsents: ConsentModelData.KeyedValues
): ConsentAPI.Record {
	// builds a consent record
	// based on a form of words, scope
	// and keyedConsents:
	// {
	// 	lbi-categoryName-channelName: 'yes',
	// 	consent-categoryName-channelName: 'no'
	// }
	let consentRecord = {};
	const fowId: string = typeof fow === 'string' ? fow : fow.id;

	if (!fowId) {
		throw new Error('Missing form of words (fow) id');
	}
	if (!scope) {
		throw new Error('Missing scope');
	}

	for (let [key, value] of Object.entries(keyedConsents)) {
		const consent = extractMetaFromString(key);
		if (consent) {
			const { category, channel, lbi } = consent;
			if (validateConsent(fow, scope, category, channel)) {
				consentRecord[category] = consentRecord[category] || {};
				consentRecord[category][channel] = {
					status: value === 'yes',
					lbi,
					scope,
					fow: fowId
				};
			}
		}
	}
	return consentRecord;
}
