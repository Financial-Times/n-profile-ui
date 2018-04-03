import { ConsentAPI } from '../types/consent-api';
import { buildConsentRecord } from '../helpers';

export interface ConsentOptions {
	selector: string;
	checkValidityBeforeSubmit?: boolean;
}

export interface ConsentCallback {
	(consent?: ConsentAPI.Record, e?: Event): void;
}

export class ConsentForm {
	public element: HTMLElement;
	public fow: string;
	public scope: string;
	public source: string;
	public submitButton: HTMLButtonElement | null;
	public radios: Array<HTMLInputElement>;
	protected options: ConsentOptions;

	constructor(opts: ConsentOptions) {
		const element = document.querySelector(opts.selector);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element as HTMLElement;

		const fow = this.getValue('formOfWordsId');
		if (!fow) {
			throw new Error('Form of words field missing');
		}
		this.fow = fow;

		const source = this.getValue('consentSource');
		if (!source) {
			throw new Error('Consent source field missing');
		}
		this.source = source;

		this.scope = this.getValue('formOfWordsScope') || 'FTPINK';
		this.radios = this.getRadios();

		this.submitButton = this.element.querySelector('.consent-form__submit');
		this.options = opts;
	}

	protected getValue(name: string): string | null {
		const field = this.element.querySelector(`input[name='${name}']`);
		return field ? (field as HTMLInputElement).value : null;
	}

	protected getRadios(checked?: boolean): Array<HTMLInputElement> {
		return Array.from(
			this.element.querySelectorAll(
				`.consent-form__radio-button${checked ? ':checked' : ''}`
			)
		);
	}

	protected consentFromRadio(radio: HTMLInputElement): ConsentAPI.Record {
		const consentObject = { [radio.name]: radio.value };
		return buildConsentRecord(this.fow, consentObject, this.source);
	}
}
