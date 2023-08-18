import * as React from 'react';
import { default as classNames } from 'classnames';
import { Flags } from '../../types/flags';
import { FowAPI } from '../../types/fow-api';

interface Props extends Omit<FowAPI.Category, 'label'> {
	flags?: Flags;
	linkAlign?: string;
	linkAriaLabel?: string;
	trackable?: string;
	text: string;
}

const Subheading = ({
	flags,
	linkAlign,
	linkText,
	linkUrl,
	linkAriaLabel,
	subheadingLevel,
	trackable,
	text,
}: Props) => {
	const classes = classNames(
		'flex-row',
		'flex-row--align-baseline',
		{ 'flex-row--justify-between': linkAlign === 'right' },
		'subheading',
		{ [`subheading--level-${subheadingLevel}`]: subheadingLevel }
	);

	return (
		<div className={classes}>
			<h2 className="flex-row__cell-grow subheading__title">{text}</h2>
			{linkText && flags && flags.hideOutboundLinks && (
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
};

export default Subheading;
