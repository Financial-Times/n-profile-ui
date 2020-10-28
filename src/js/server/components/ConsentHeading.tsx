import * as React from 'react';

interface Props {
	children: React.ReactChildren | React.ReactChild;
	isSubsection: boolean;
}

const ConsentHeading = ({ children, isSubsection }: Props) =>
	!isSubsection ? (
		<h1 className="consent-form__heading-level-1">{children}</h1>
	) : (
		<h2 className="consent-form__heading-level-1">{children}</h2>
	);

export default ConsentHeading;
