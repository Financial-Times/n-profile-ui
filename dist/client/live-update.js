'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const consent_1 = require('./consent');
class LiveUpdateConsent extends consent_1.ConsentForm {
	constructor (opts) {
		super(opts);
		if (this.submitButton) {
			this.submitButton.style.display = 'none';
		}
	}
	onChange (callback) {
		this.radios.forEach((radio) => {
			radio.addEventListener('change', (e) => {
				const consent = this.consentFromRadio(radio);
				callback(consent, e);
			});
		});
	}
}
exports.LiveUpdateConsent = LiveUpdateConsent;
