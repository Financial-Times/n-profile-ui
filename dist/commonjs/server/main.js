'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.helpers = exports.getFormOfWords = void 0;
require('isomorphic-fetch');
const helpers = require('../helpers');
exports.helpers = helpers;
async function getFormOfWords (name, scope = 'FTPINK') {
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
