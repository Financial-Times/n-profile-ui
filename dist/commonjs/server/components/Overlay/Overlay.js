'use strict';
let __importStar = (this && this.__importStar) || function (mod) {
	if (mod && mod.__esModule) return mod;
	let result = {};
	if (mod != null) for (let k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	result['default'] = mod;
	return result;
};
Object.defineProperty(exports, '__esModule', { value: true });
const React = __importStar(require('react'));
const __1 = require('../');
const Overlay = ({ formOfWords }) => (React.createElement(React.Fragment, null,
	React.createElement('script', { type: 'text/template', id: 'overlay-gdpr-consent' }),
	React.createElement('div', { className: 'consent-form-content' },
		React.createElement('button', { type: 'button', className: 'o-overlay__close' }, 'Ask later'),
		React.createElement('div', { className: 'consent-form-content__inner' },
			React.createElement('form', { className: 'consent-form consent-form--scrollable' },
				React.createElement(__1.Consent, { showHeading: true, showSubmitButton: false, isSubsection: false, formOfWords: formOfWords })),
			React.createElement('div', { className: 'consent-confirmation hidden' },
				React.createElement(__1.Confirmation, { redirect: 'https://wwww.ft.com' })))),
	React.createElement(__1.Banner, null)));
exports.default = Overlay;
