import React from 'react';
const YesNoSwitch = ({ label, category, channel, advisory, lbi, checkedYes, checkedNo, elementAttrs, inputClass, toggleOnLabel, toggleOffLabel }) => (React.createElement('fieldset', { className: 'consent-form__fieldset' },
	React.createElement('legend', { className: 'o-normalise-visually-hidden' }, label),
	React.createElement('div', { className: 'o-forms-field o-forms-field--inline' },
		React.createElement('span', { className: 'o-forms-title' },
			React.createElement('span', { className: 'o-forms-title__main', id: `legend-${category}-${channel}`, 'aria-hidden': 'true' }, label),
			advisory && (React.createElement('div', { className: 'consent-form__item-advisory' }, advisory))),
		React.createElement('span', { className: 'o-forms-input o-forms-input--radio-box' },
			React.createElement('div', { className: 'o-forms-input--radio-box__container' },
				React.createElement('label', { htmlFor: `${category}-${channel}-yes` },
					React.createElement('input', Object.assign({ type: 'radio', name: `${lbi ? 'lbi' : 'consent'}-${category}-${channel}`, value: 'yes', className: `consent-form__radio-button ${inputClass &&
                            inputClass}`, id: `${category}-${channel}-yes`, 'aria-describedby': `legend-${category}-${channel}`, 'data-trackable': `${lbi ? 'lbi' : 'consent'}-${category}-${channel}-yes`, checked: checkedYes }, elementAttrs)),
					React.createElement('span', { className: 'o-forms-input__label', 'aria-hidden': 'true' }, toggleOnLabel ? toggleOnLabel : 'Yes')),
				React.createElement('label', { htmlFor: `${category}-${channel}-no` },
					React.createElement('input', Object.assign({ type: 'radio', name: `${lbi ? 'lbi' : 'consent'}-${category}-${channel}`, value: 'no', className: 'consent-form__radio-button consent-form__radio-button--negative', id: `${category}-${channel}-no`, 'aria-describedby': `legend-${category}-${channel}`, 'data-trackable': `${lbi ? 'lbi' : 'consent'}-${category}-${channel}-no`, checked: checkedNo }, elementAttrs)),
					React.createElement('span', { className: 'o-forms-input__label', 'aria-hidden': 'true' }, toggleOffLabel ? toggleOffLabel : 'No'))),
			React.createElement('div', { className: 'o-forms-input__state', 'aria-hidden': 'false', 'aria-live': 'polite' }),
			React.createElement('div', { className: 'o-forms-input__error' }, 'There was a problem saving, please try later.')))));
export default YesNoSwitch;
