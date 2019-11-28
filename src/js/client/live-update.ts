
import { ConsentForm, ConsentOptions, ConsentCallback } from './consent';

export class LiveUpdateConsent extends ConsentForm {
	constructor(opts: ConsentOptions) {
		super(opts);
		if(this.submitButton) {
			this.submitButton.style.display = 'none';
		}
	}

	private saveSuccess (radioWrapper) {
		if (radioWrapper) {
			radioWrapper.classList.remove('o-forms-input--error');
			radioWrapper.classList.remove('o-forms-input--saving');
			radioWrapper.classList.add('o-forms-input--saved');
		}
		this.savedEvent({ success: true });
	}

	private saveFail (radioWrapper) {
		if (radioWrapper) {
			radioWrapper.classList.remove('o-forms-input--saving');
			radioWrapper.classList.add('o-forms-input--error');
			// reset radio to previous value
			const unchecked = radioWrapper.querySelector('.o-forms-input__radio-button:not(:checked)');
			if (unchecked) {
				unchecked.checked = true;
			}
		}
		this.savedEvent({ success: false });
	}

	private redirect() {
		window.location.assign(`/login${document.referrer ? `?location=${document.referrer}` : ''}`);
	}

	private savedEvent ({ success }) {
		const event = new CustomEvent('o-forms-input:saved', {
			detail: {
				success
			}
		});
		this.element.dispatchEvent(event);
	}

	public onChange(callback: ConsentCallback) {
		this.radios.forEach((radio: HTMLInputElement) => {
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
