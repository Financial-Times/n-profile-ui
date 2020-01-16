import React from 'react';
import PropTypes from 'prop-types';

const SubHeading = ({
	linkAlign,
	linkText,
	linkUrl,
	linkAriaLabel,
	trackable
}) => (
	<div
		className={`flex-row flex-row--align-baseline ${linkAlign === 'right' &&
			'flex-row--justify-between'} subheading ${subheadingLevel &&
			`subheading--level-${subheadingLevel}`}`}
	>
		<h2 className="flex-row__cell-grow subheading__title">{props.text}</h2>
		{/* // TODO Get global flags */}
		{linkText && flags.hideOutboundLinks && (
			<a
				className="subheading__link"
				href={linkUrl}
				target="_blank"
				rel="noopener"
				aria-label={linkAriaLabel}
				data-trackable={trackable}
			>
				{linkText}
			</a>
		)}
	</div>
);

SubHeading.propTypes = {
	linkAlign: PropTypes.string,
	linkText: PropTypes.string,
	linkUrl: PropTypes.string,
	linkAriaLabel: PropTypes.string,
	trackable: PropTypes.bool
};

export default SubHeading;
