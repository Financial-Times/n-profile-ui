
import { ConsentForm, ConsentOptions, ConsentCallback } from './consent';

export class LiveUpdateConsent extends ConsentForm {
	constructor(opts: ConsentOptions) {
		super(opts);
		if(this.submitButton) {
			this.submitButton.style.display = 'none';
		}
	}

	// TODO: Validation messages on failed update
	public onChange(callback: ConsentCallback) {
		this.radios.forEach((radio: HTMLInputElement) => {
			radio.addEventListener('change', (e) => {
				const consent = this.consentFromRadio(radio);
				callback(consent, e);
			});
		});
	}
}
