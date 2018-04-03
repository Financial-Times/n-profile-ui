'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const helpers_1 = require('../helpers');
class ConsentForm {
    constructor (opts) {
        const element = document.querySelector(opts.selector);
        if (!element) {
            throw new Error('Invalid selector');
        }
        this.element = element;
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
    getValue (name) {
        const field = this.element.querySelector(`input[name='${name}']`);
        return field ? field.value : null;
    }
    getRadios (checked) {
        return Array.from(this.element.querySelectorAll(`.consent-form__radio-button${checked ? ':checked' : ''}`));
    }
    consentFromRadio (radio) {
        const consentObject = { [radio.name]: radio.value };
        return helpers_1.buildConsentRecord(this.fow, consentObject, this.source);
    }
}
exports.ConsentForm = ConsentForm;
