import * as React from 'react';
import * as flags from '@financial-times/dotcom-ui-flags';
const Subheading = ({ linkAlign, linkText, linkUrl, linkAriaLabel, subheadingLevel, trackable, text }) => {
	const flagsClient = flags.init();
	return (React.createElement('div', { className: `flex-row flex-row--align-baseline ${linkAlign ===
            'right' &&
            'flex-row--justify-between'} subheading ${subheadingLevel &&
            `subheading--level-${subheadingLevel}`}` },
	React.createElement('h2', { className: 'flex-row__cell-grow subheading__title' }, text),
	linkText && flagsClient.get('hideOutboundLinks') && (React.createElement('a', { className: 'subheading__link', href: linkUrl, target: '_blank', rel: 'noopener', 'aria-label': linkAriaLabel, 'data-trackable': trackable }, linkText))));
};
export default Subheading;
