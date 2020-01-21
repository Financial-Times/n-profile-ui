import * as React from 'react';
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

	return (
		<div
			className={`flex-row flex-row--align-baseline ${linkAlign ===
				'right' &&
				'flex-row--justify-between'} subheading ${subheadingLevel &&
				`subheading--level-${subheadingLevel}`}`}
		>
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
