'use strict';
let __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const YesNoSwitch = ({ label, category, channel, advisory, lbi, checkedYes, checkedNo, elementAttrs, inputClass, toggleOnLabel, toggleOffLabel }) => (react_1.default.createElement('fieldset', { className: 'consent-form__fieldset' },
	react_1.default.createElement('legend', { className: 'o-normalise-visually-hidden' }, label),
	react_1.default.createElement('div', { className: 'o-forms-field o-forms-field--inline' },
		react_1.default.createElement('span', { className: 'o-forms-title' },
			react_1.default.createElement('span', { className: 'o-forms-title__main', id: `legend-${category}-${channel}`, 'aria-hidden': 'true' }, label),
			advisory && (react_1.default.createElement('div', { className: 'consent-form__item-advisory' }, advisory))),
		react_1.default.createElement('span', { className: 'o-forms-input o-forms-input--radio-box' },
			react_1.default.createElement('div', { className: 'o-forms-input--radio-box__container' },
				react_1.default.createElement('label', { htmlFor: `${category}-${channel}-yes` },
					react_1.default.createElement('input', Object.assign({ type: 'radio', name: `${lbi ? 'lbi' : 'consent'}-${category}-${channel}`, value: 'yes', className: `consent-form__radio-button ${inputClass &&
                            inputClass}`, id: `${category}-${channel}-yes`, 'aria-describedby': `legend-${category}-${channel}`, 'data-trackable': `${lbi ? 'lbi' : 'consent'}-${category}-${channel}-yes`, checked: checkedYes }, elementAttrs)),
					react_1.default.createElement('span', { className: 'o-forms-input__label', 'aria-hidden': 'true' }, toggleOnLabel ? toggleOnLabel : 'Yes')),
				react_1.default.createElement('label', { htmlFor: `${category}-${channel}-no` },
					react_1.default.createElement('input', Object.assign({ type: 'radio', name: `${lbi ? 'lbi' : 'consent'}-${category}-${channel}`, value: 'no', className: 'consent-form__radio-button consent-form__radio-button--negative', id: `${category}-${channel}-no`, 'aria-describedby': `legend-${category}-${channel}`, 'data-trackable': `${lbi ? 'lbi' : 'consent'}-${category}-${channel}-no`, checked: checkedNo }, elementAttrs)),
					react_1.default.createElement('span', { className: 'o-forms-input__label', 'aria-hidden': 'true' }, toggleOffLabel ? toggleOffLabel : 'No'))),
			react_1.default.createElement('div', { className: 'o-forms-input__state', 'aria-hidden': 'false', 'aria-live': 'polite' }),
			react_1.default.createElement('div', { className: 'o-forms-input__error' }, 'There was a problem saving, please try later.')))));
exports.default = YesNoSwitch;
