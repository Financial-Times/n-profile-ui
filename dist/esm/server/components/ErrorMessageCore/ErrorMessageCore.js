import * as React from 'react';
const ErrorMessageCore = ({ highlight, hideDetail, detail, additional, actions, hideActions }) => (React.createElement('div', { className: 'o-message o-message--alert o-message--inner o-message--error', 'data-o-component': 'o-message' },
	React.createElement('div', { className: 'o-message__container' },
		React.createElement('div', { className: 'o-message__content' },
			React.createElement('p', { className: 'o-message__content-main' },
				React.createElement('span', { className: 'o-message__content-highlight consent-message__content-block' }, highlight
					? highlight
					: 'Your Contact Preferences couldn\'t be saved.'),
				!hideDetail && (React.createElement('span', { className: 'o-message__content-detail' }, detail
					? detail
					: 'These can be set anytime in myFT.'))),
			additional && (React.createElement('p', { className: 'o-message__content--additional' }, additional)),
			actions ? (React.createElement('div', { className: 'o-message__actions' },
				actions.primary && (React.createElement('a', { href: actions.primary.url, className: 'o-message__actions__primary' }, actions.primary.text)),
				actions.secondary && (React.createElement('a', { href: actions.secondary.url, className: 'o-message__actions__secondary' }, actions.secondary.text)))) : (hideActions && (React.createElement('div', { className: 'o-message__actions' },
				React.createElement('a', { href: '/myft/alerts/', className: 'o-message__actions__primary' }, 'Visit Contact Preferences'),
				React.createElement('a', { href: 'https://help.ft.com/', className: 'o-message__actions__secondary' }, 'Help centre'))))))));
export default ErrorMessageCore;
