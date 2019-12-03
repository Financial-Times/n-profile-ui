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
	saveSuccess (radioWrapper) {
		if (radioWrapper) {
			radioWrapper.classList.remove('o-forms-input--error');
			radioWrapper.classList.remove('o-forms-input--saving');
			radioWrapper.classList.add('o-forms-input--saved');
		}
		this.savedEvent({ success: true });
	}
	saveFail (radioWrapper) {
		if (radioWrapper) {
			radioWrapper.classList.remove('o-forms-input--saving');
			radioWrapper.classList.add('o-forms-input--error');
			const unchecked = radioWrapper.querySelector('.o-forms-input__radio-button:not(:checked)');
			if (unchecked) {
				unchecked.checked = true;
			}
		}
		this.savedEvent({ success: false });
	}
	redirect () {
		window.location.assign(`/login${document.referrer ? `?location=${document.referrer}` : ''}`);
	}
	savedEvent ({ success }) {
		const event = new CustomEvent('consent-form:saved', {
			detail: {
				success
			}
		});
		this.element.dispatchEvent(event);
	}
	onChange (callback) {
		this.radios.forEach((radio) => {
			radio.addEventListener('change', (e) => {
				const consent = this.consentFromRadio(radio);
				const radioWrapper = radio.closest('.o-forms-input');
				if (radioWrapper) {
					radioWrapper.classList.add('o-forms-input--saving');
					radioWrapper.classList.remove('o-forms-input--saved');
					callback(consent, e)
						.then(result => {
							if (result === 'success') {
								return this.saveSuccess(radioWrapper);
							}
							if (result === 'redirect') {
								return this.redirect();
							}
							this.saveFail(radioWrapper);
						})
						.catch(() => {
							this.saveFail(radioWrapper);
						});
				}
			});
		});
	}
}
exports.LiveUpdateConsent = LiveUpdateConsent;
