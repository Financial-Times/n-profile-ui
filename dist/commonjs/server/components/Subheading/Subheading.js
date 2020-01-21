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
const flags = __importStar(require('@financial-times/dotcom-ui-flags'));
const Subheading = ({ linkAlign, linkText, linkUrl, linkAriaLabel, subheadingLevel, trackable, text }) => {
	const flagsClient = flags.init();
	return (React.createElement('div', { className: `flex-row flex-row--align-baseline ${linkAlign ===
            'right' &&
            'flex-row--justify-between'} subheading ${subheadingLevel &&
            `subheading--level-${subheadingLevel}`}` },
	React.createElement('h2', { className: 'flex-row__cell-grow subheading__title' }, text),
	linkText && flagsClient.get('hideOutboundLinks') && (React.createElement('a', { className: 'subheading__link', href: linkUrl, target: '_blank', rel: 'noopener', 'aria-label': linkAriaLabel, 'data-trackable': trackable }, linkText))));
};
exports.default = Subheading;
