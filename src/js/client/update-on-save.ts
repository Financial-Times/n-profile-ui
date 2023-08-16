import { ConsentAPI } from '../types/consent-api';
import { ConsentForm, ConsentOptions, ConsentCallback } from './consent';
import { buildConsentRecord } from '../helpers';

export class UpdateConsentOnSave extends ConsentForm {
	constructor(opts: ConsentOptions) {
		super(opts);
		if (
			this.submitButton &&
			this.options.checkValidityBeforeSubmit &&
			!this.checkValidity()
		) {
			this.submitButton.disabled = true;
		}
	}

	public get values(): ConsentAPI.Record {
		const radios = this.getRadios(true);
		let consentObject = {};

		radios.forEach((radio: HTMLInputElement) => {
			consentObject[radio.name] = radio.value;
		});

		const checkboxes = this.getCheckboxes();

		checkboxes.forEach((checkbox: HTMLInputElement) => {
			consentObject[checkbox.name] = checkbox.checked ? 'yes' : 'no';
		});

		return buildConsentRecord(this.fow, consentObject, this.source);
	}

	public checkValidity(): boolean {
		for (const radio of this.radios) {
			if (!radio.checkValidity()) {
				return false;
			}
		}
		return true;
	}

	public onChange(callback?: ConsentCallback) {
		if (callback || this.options.checkValidityBeforeSubmit) {
			this.radios.forEach((radio: HTMLInputElement) => {
				radio.addEventListener('change', (e) => {
					if (
						this.submitButton &&
						this.options.checkValidityBeforeSubmit &&
						this.checkValidity()
					) {
						this.submitButton.disabled = false;
					}
					if (callback) {
						const consent = this.consentFromRadio(radio);
						callback(consent, e);
					}
				});
			});
		}
	}

	// TODO: Validation messages on failed update
	public onSubmit(callback: ConsentCallback) {
		if (this.submitButton) {
			this.submitButton.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				callback(this.values, e);
			});
		}
	}
}
