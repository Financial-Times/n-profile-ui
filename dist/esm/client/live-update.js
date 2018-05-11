import { ConsentForm } from './consent';
export class LiveUpdateConsent extends ConsentForm {
	constructor (opts) {
		super(opts);
		if (this.submitButton) {
			this.submitButton.style.display = 'none';
		}
	}
	saveSuccess (radioWrapper) {
		if (radioWrapper) {
			radioWrapper.classList.remove('consent-form--error');
			radioWrapper.classList.add('consent-form--saved');
		}
		this.savedEvent({ success: true });
	}
	saveFail (radioWrapper) {
		if (radioWrapper) {
			radioWrapper.classList.add('consent-form--error');
			const unchecked = radioWrapper.querySelector('.consent-form__radio-button:not(:checked)');
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
				const radioWrapper = radio.closest('.consent-form');
				if (radioWrapper) {
					radioWrapper.classList.remove('consent-form--saved');
					callback(consent, e)
						.then(response => {
							if (response.status < 400) {
								return this.saveSuccess(radioWrapper);
							}
							if (response.status === 403) {
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
