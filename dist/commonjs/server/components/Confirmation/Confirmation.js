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
const Confirmation = ({ redirect }) => (React.createElement(React.Fragment, null,
	React.createElement('h2', { className: 'consent-form__heading-level-3 margin-bottom-x3' },
		'Thank you',
		React.createElement('br', null),
		'We\'ve updated your preferences'),
	React.createElement('div', { className: 'consent-form__consent-info margin-top-x8', 'data-trackable': 'customer-message' }, 'We\'ll still send you service messages about your account, security or legal notifications.'),
	React.createElement('div', { className: 'consent-form__confirm-opt-in' },
		'You can opt-in to other emails from the FT or change what you receive by visiting the',
		' ',
		React.createElement('a', { className: 'link-external', href: '#' }, 'Preferences centre')),
	React.createElement('div', { className: 'consent-form__submit-wrapper' },
		React.createElement('a', { href: redirect, className: 'consent-form__close o-buttons o-buttons--primary o-buttons--big' }, 'Continue to FT.com'))));
exports.default = Confirmation;
