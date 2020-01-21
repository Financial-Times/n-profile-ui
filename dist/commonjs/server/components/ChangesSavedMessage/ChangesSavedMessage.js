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
const ChangesSavedMessage = () => (React.createElement('div', { className: 'consent-message-demo' },
	React.createElement('div', { className: 'o-message o-message--alert o-message--inner o-message--success', 'data-o-component': 'o-message' },
		React.createElement('div', { className: 'o-message__container' },
			React.createElement('div', { className: 'o-message__content' },
				React.createElement('p', { className: 'o-message__content-main' },
					React.createElement('span', { className: 'o-message__content-highlight' }, 'Your changes have been saved.')))))));
exports.default = ChangesSavedMessage;
