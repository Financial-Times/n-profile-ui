import * as React from 'react';
import { Consent, Confirmation, Banner } from '../';
const Overlay = ({ formOfWords }) => (React.createElement(React.Fragment, null,
	React.createElement('script', { type: 'text/template', id: 'overlay-gdpr-consent' }),
	React.createElement('div', { className: 'consent-form-content' },
		React.createElement('button', { type: 'button', className: 'o-overlay__close' }, 'Ask later'),
		React.createElement('div', { className: 'consent-form-content__inner' },
			React.createElement('form', { className: 'consent-form consent-form--scrollable' },
				React.createElement(Consent, { showHeading: true, showSubmitButton: false, isSubsection: false, formOfWords: formOfWords })),
			React.createElement('div', { className: 'consent-confirmation hidden' },
				React.createElement(Confirmation, { redirect: 'https://wwww.ft.com' })))),
	React.createElement(Banner, null)));
export default Overlay;
