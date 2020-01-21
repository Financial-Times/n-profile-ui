import 'isomorphic-fetch';
import * as helpers from '../helpers';
import { FowAPI } from '../types/fow-api';

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
	const json = await fow.json();

	return json;
}

