import * as React from 'react';

interface Props {
	children: React.ReactChildren | React.ReactChild;
	isSubsection: boolean;
	showToggleSwitch: boolean;
}

const ConsentHeading = ({
	children,
	isSubsection,
	showToggleSwitch,
}: Props) => {
	if (isSubsection) {
		if (showToggleSwitch) {
			return <h6 className="consent-form__heading-level-6">{children}</h6>;
		}
		return <h3 className="consent-form__heading-level-3">{children}</h3>;
	}

	return <h2 className="consent-form__heading-level-3">{children}</h2>;
};

export default ConsentHeading;
