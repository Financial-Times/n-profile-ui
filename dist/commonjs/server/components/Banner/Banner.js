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
const Banner = () => (React.createElement('div', { className: 'consent-banner', 'data-consent-component': 'consent-banner' },
	React.createElement('div', { className: 'consent-banner__outer' },
		React.createElement('div', { className: 'consent-banner__inner', 'data-consent-banner-inner': '' },
			React.createElement('div', { className: 'consent-banner__content' },
				React.createElement('p', null,
					React.createElement('strong', null, 'Don\u2019t lose touch with the FT.'),
					' Check your Contact Preferences.')),
			React.createElement('div', { className: 'consent-banner__actions' },
				React.createElement('div', { className: 'consent-banner__action' },
					React.createElement('button', { type: 'button', className: 'consent-banner__button' }, 'Check your preferences')))))));
exports.default = Banner;
