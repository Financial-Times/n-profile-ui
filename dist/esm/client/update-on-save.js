import { ConsentForm } from './consent';
import { buildConsentRecord } from '../helpers';
export class UpdateConsentOnSave extends ConsentForm {
    constructor(opts) {
        super(opts);
        if (this.submitButton && this.options.checkValidityBeforeSubmit && !this.checkValidity()) {
            this.submitButton.disabled = true;
        }
    }
    get values() {
        const radios = this.getRadios(true);
        const consentObject = {};
        radios.forEach((radio) => {
            consentObject[radio.name] = radio.value;
        });
        return buildConsentRecord(this.fow, consentObject, this.source);
    }
    checkValidity() {
        for (const radio of this.radios) {
            if (!radio.checkValidity()) {
                return false;
            }
        }
        return true;
    }
    onChange(callback) {
        if (callback || this.options.checkValidityBeforeSubmit) {
            this.radios.forEach((radio) => {
                radio.addEventListener('change', e => {
                    if (this.submitButton && this.options.checkValidityBeforeSubmit && this.checkValidity()) {
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
    onSubmit(callback) {
        if (this.submitButton) {
            this.submitButton.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                callback(this.values, e);
            });
        }
    }
}
