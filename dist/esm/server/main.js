import 'isomorphic-fetch';
import * as helpers from '../helpers';
export async function getFormOfWords(name, scope = 'FTPINK') {
    if (!process.env.FOW_API_HOST) {
        throw new Error('Missing FOW_API_HOST environment variable');
    }
    const url = `${process.env.FOW_API_HOST}/api/v1/${scope}/${name}`;
    const fow = await fetch(url, {
        timeout: 2000
    });
    return await fow.json();
}
export { helpers };
