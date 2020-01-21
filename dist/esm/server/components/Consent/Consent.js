let __rest = (this && this.__rest) || function (s, e) {
	let t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
		t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === 'function')
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
				t[p[i]] = s[p[i]];
		}
	return t;
};
import * as React from 'react';
import { ConsentHeading, ErrorMessageCore, FOWHiddenInputs, YesNoSwitch } from '../';
const Consent = ({ showHeading, isSubsection, formOfWords, showSubmitButton }) => (React.createElement(React.Fragment, null,
	showHeading && formOfWords.copy && (React.createElement(React.Fragment, null,
		React.createElement(ConsentHeading, { isSubsection: isSubsection },
			React.createElement(React.Fragment, null,
				formOfWords.copy.heading1 && formOfWords.copy.heading1,
				formOfWords.copy.straplineHeading && (React.createElement('span', { className: 'consent-form__heading-strapline' }, formOfWords.copy.straplineHeading)))),
		React.createElement('div', { className: 'consent-form__intro-text' }, formOfWords.copy.straplineSmall &&
            formOfWords.copy.straplineSmall))),
	formOfWords.error && (React.createElement('div', { className: 'consent-message-demo consent-message-demo--error margin-bottom-x5' },
		React.createElement(ErrorMessageCore, { detail: formOfWords.error }))),
	React.createElement(FOWHiddenInputs, { formOfWords: formOfWords }),
	React.createElement('div', { className: 'consent-form' },
		React.createElement('div', { className: 'consent-form__section-wrapper' }, formOfWords.consents &&
            formOfWords.consents.map(({ category, channels, heading, label }) => (React.createElement('div', { className: 'consent-form__section', key: heading },
            	isSubsection ? (React.createElement('h3', { className: 'consent-form__heading-level-3' }, heading)) : (React.createElement('h2', { className: 'consent-form__heading-level-3' }, heading)),
            	React.createElement('div', { className: 'consent-form__section-label consent-form__limit-width' }, label),
            	React.createElement('div', { className: 'consent-form__switches-group' }, channels.map((_a) => {
            		let { label } = _a; let rest = __rest(_a, ['label']);
            		return (React.createElement(YesNoSwitch, Object.assign({ key: label, category: category, label: label }, rest)));
            	})))))),
		formOfWords.copy && formOfWords.copy.serviceMessagesInfo && (React.createElement('div', { className: 'consent-form__consent-info margin-top-x8', dangerouslySetInnerHTML: {
			__html: formOfWords.copy.serviceMessagesInfo
		} })),
		showSubmitButton && (React.createElement('div', { className: 'consent-form__submit-wrapper' },
			React.createElement('button', { type: 'submit', className: 'consent-form__submit o-buttons o-buttons--primary o-buttons--big' }, formOfWords.copy && formOfWords.copy.submitButton
				? formOfWords.copy.submitButton
				: 'Confirm'))))));
export default Consent;
