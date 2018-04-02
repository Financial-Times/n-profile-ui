import 'isomorphic-fetch';
import * as helpers from '../helpers';
import { ConsentAPI } from '../types/consent-api';
import { FowAPI } from '../types/fow-api';
import { UserConsent } from '@financial-times/n-user-api-client';

export async function getFormOfWords(
	name: string,
	scope: string = 'FTPINK'
): Promise<FowAPI.Fow> {
	if(!process.env.FOW_API_HOST) {
		throw new Error('Missing FOW_API_HOST environment variable');
	}
	const url = `${process.env.FOW_API_HOST}/api/v1/${scope}/${name}`;
	const fow = await fetch(url, {
		timeout: 2000
	} as RequestInit);
	return await fow.json();
}

export function saveConsent(
	uuid: string,
	consentRecord: ConsentAPI.Record,
	source: string,
	mode: string = 'PROD',
	scope: string = 'FTPINK'
): Promise<ConsentAPI.Channel> {
	const api = new UserConsent(uuid, source, mode, scope);
	const category = Object.keys(consentRecord)[0];
	const channel = Object.keys(consentRecord[category])[0];
	const consent = consentRecord[category][channel];
	return api.updateConsent(category, channel, consent);
}

export function createConsentRecord(
	uuid: string,
	consentRecord: ConsentAPI.Record,
	source: string,
	mode: string = 'PROD',
	scope: string = 'FTPINK'
): Promise<ConsentAPI.Record> {
	const api = new UserConsent(uuid, source, mode, scope);
	return api.createConsentRecord(consentRecord);
}

export function updateConsentRecord(
	uuid: string,
	consentRecord: ConsentAPI.Record,
	source: string,
	mode: string = 'PROD',
	scope: string = 'FTPINK'
): Promise<ConsentAPI.Record> {
	const api = new UserConsent(uuid, source, mode, scope);
	return api.updateConsentRecord(consentRecord);
}

export { helpers };
