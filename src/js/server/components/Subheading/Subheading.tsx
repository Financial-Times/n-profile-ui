import * as React from 'react';
import classNames from 'classnames';
import * as flags from '@financial-times/dotcom-ui-flags';
import { FowAPI } from '../../../types/fow-api';

interface Props extends Omit<FowAPI.Category, 'label'> {
	linkAlign?: string;
	linkAriaLabel?: string;
	trackable?: string;
	text: string;
}

const Subheading = ({
	linkAlign,
	linkText,
	linkUrl,
	linkAriaLabel,
	subheadingLevel,
	trackable,
	text
}: Props) => {
	const flagsClient = (flags as any).init();

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
			{linkText && flagsClient.get('hideOutboundLinks') && (
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
