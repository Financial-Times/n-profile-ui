import { LiveUpdateConsent } from '../../../src/js/client/live-update';
import './polyfills';
import loadHtml from './load-html';

const formOfWords = require('../../fixtures/form-of-words.json');

export default function (callback) {
	document.body.innerHTML = loadHtml({
		formOfWords: { ...formOfWords, source: 'test' }
	});

	const consentForm = new LiveUpdateConsent({
		selector: '.js-consent-preference'
	});
	consentForm.element.addEventListener('consent-form:saved', () => {
		callback();
	});
	consentForm.onChange((consent) => {
		const url = consentForm.element.getAttribute('action');
		return fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: consent
			})
		});
	});
};
