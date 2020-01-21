import * as React from 'react';
import { ErrorMessageCore, Subheading, FOWHiddenInputs, YesNoSwitch } from '../';
const Settings = ({ changesSaved, formOfWords, toggleOnLabel, toggleOffLabel, showSubmitButton }) => (React.createElement(React.Fragment, null,
	formOfWords.copy.heading1 && (React.createElement('h1', { className: 'consent-form__heading-level-1' }, formOfWords.copy.heading1)),
	changesSaved && (React.createElement('div', { className: 't-settings-saved margin-top-x4 margin-bottom-x5' }, 'changes-saved-messages')),
	formOfWords.error && (React.createElement('div', { className: 't-settings-error consent-message-demo consent-message-demo--error margin-top-x4 margin-bottom-x5' },
		React.createElement(ErrorMessageCore, null))),
	formOfWords.copy.straplineSmall && (React.createElement('div', { className: 'consent-form__intro-text' }, formOfWords.copy.straplineSmall)),
	React.createElement(FOWHiddenInputs, { formOfWords: formOfWords }),
	React.createElement('div', { className: 'consent-form' },
		formOfWords.consents.map(({ category, channels, label, linkText, linkUrl, subheadingLevel }) => (React.createElement(React.Fragment, { key: linkUrl },
			React.createElement('div', { className: 'margin-bottom-x6' },
				React.createElement(Subheading, { channels: channels, category: category, linkText: linkText, linkUrl: linkUrl, subheadingLevel: subheadingLevel, text: label, trackable: '' }),
				React.createElement('div', null, channels.map((channel, i) => (React.createElement(React.Fragment, { key: i },
					React.createElement(YesNoSwitch, Object.assign({}, channel, { category: category, toggleOnLabel: toggleOnLabel, toggleOffLabel: toggleOffLabel })))))))))),
		formOfWords.copy.submitPreamble && formOfWords.copy.submitPreamble,
		showSubmitButton && !formOfWords.error && (React.createElement('div', { className: 'consent-form__submit-wrapper' },
			React.createElement('button', { type: 'submit', className: 'consent-form__submit o-buttons o-buttons--primary o-buttons--big' }, formOfWords.copy.submitButton
				? formOfWords.copy.submitButton
				: 'Confirm'))))));
export default Settings;
