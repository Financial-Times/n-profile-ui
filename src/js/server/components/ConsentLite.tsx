// TODO:  We've added showToggleSwitch flag  for the new design we are A/B testing. https://financialtimes.atlassian.net/browse/ACQ-1472
// Depending on the results from this test we will update the code in this component accordingly.

import { FowAPI } from '../../types/fow-api';

import * as React from 'react';

import ToggleSwitch from './ToggleSwitch';
import ConsentHeading from './ConsentHeading';
import FOWHiddenInputs from './FOWHiddenInputs';

interface Props {
	showToggleSwitch: boolean;
	showHeading: boolean;
	showSubmitButton: boolean;
	isSubsection: boolean;
	formOfWords: FowAPI.Fow;
	label: string;
	showFooter: boolean;
}

const formsFieldClassName = (showToggleSwitch) => {
	return showToggleSwitch
		? 'o-forms-input o-forms-input--toggle'
		: 'o-forms-input o-forms-input--checkbox';
};

const ConsentFields = ({ formOfWords, showToggleSwitch }) => (
	<div className="consent-form__section-wrapper">
		<div className="o-forms-field">
			<span className={`${formsFieldClassName(showToggleSwitch)}`}>
				{formOfWords.consents &&
					formOfWords.consents.map(({ category, label, heading }) => {
						return showToggleSwitch ? (
							<ToggleSwitch
								key={category}
								label={label}
								heading={heading}
								category={category}
								isLite={true}
							/>
						) : (
							<CheckBox key={category} label={label} category={category} />
						);
					})}
			</span>
		</div>
	</div>
);

const CheckBox = ({ label, category }) => {
	const inputName = `consent-${category}-byEmail`;

	return (
		<label htmlFor={category}>
			<input
				id={category}
				type="checkbox"
				name={inputName}
				value="yes"
				defaultChecked
			/>
			<span className="o-forms-input__label">{label}</span>
			<input
				id={`${category}_hidden`}
				type="hidden"
				name={inputName}
				value="no"
			/>
		</label>
	);
};

const MoreInfo = ({ formOfWords }) => {
	const defaultMoreInfo = (style) => (
		<div className="consent-form__consent-info-para" style={style}>
			For more information about how we use your data, please refer to our
			<a
				className="consent-form__link--external"
				href="http://help.ft.com/help/legal-privacy/privacy/"
				target="_blank"
			>
				&nbsp;privacy
			</a>
			&nbsp;and
			<a
				className="consent-form__link--external"
				href="http://help.ft.com/help/legal-privacy/cookies/"
				target="_blank"
			>
				&nbsp;cookie
			</a>
			&nbsp;policies.
		</div>
	);

	switch (formOfWords.moreInfoCustom) {
		case 'inArticleSignUp':
			return (
				<div className="consent-form__consent-info-para">
					By signing up for this email, you're registering for a free account
					with the FT. You'll also receive our weekly Editor's Digest
					Newsletter. Full
					<a
						className="consent-form__link--external"
						href="http://help.ft.com/help/legal-privacy/terms-conditions/"
						target="_blank"
					>
						&nbsp;Terms and Conditions
					</a>
					&nbsp;apply.&nbsp;{defaultMoreInfo({ display: 'inline' })}
				</div>
			);
			case 'inArticleSignUpUSElection':
				return (
					<div className="consent-form__consent-info-para">
						By signing up for this email, you're registering for a free account
						with the FT. Full
						<a
							className="consent-form__link--external"
							href="http://help.ft.com/help/legal-privacy/terms-conditions/"
							target="_blank"
						>
							&nbsp;Terms and Conditions
						</a>
						&nbsp;apply.&nbsp;{defaultMoreInfo({ display: 'inline' })}
					</div>
				);
		default:
			return defaultMoreInfo({});
	}
};

/**
 * moreInfoCustom will be set for specific pages like Google register consent
 */
export const Footer = ({ formOfWords }: { formOfWords: FowAPI.Fow }) => {
	const showServiceMessage =
		formOfWords.copy.serviceMessagesInfo &&
		formOfWords.moreInfoCustom !== 'inGoogleRegisterConsent';

	if (showServiceMessage) {
		return <>{formOfWords.copy.serviceMessagesInfo}</>;
	}

	return (
		<div className="manage-account-footer">
			<div>Need to change anything?</div>
			<a href="https://www.ft.com/myft/alerts">Manage your account</a>
		</div>
	);
};

const SubmitButton = ({ formOfWords }) => (
	<div className="consent-form__submit-wrapper">
		<button
			type="submit"
			className="consent-form__submit o-buttons o-buttons--primary o-buttons--big ncf__button--submit"
		>
			{formOfWords.copy && formOfWords.copy.submitButton
				? formOfWords.copy.submitButton
				: 'Start Reading'}
		</button>
	</div>
);

const ConsentLite = ({
	showToggleSwitch,
	showHeading,
	isSubsection,
	formOfWords,
	showSubmitButton,
	showFooter = true,
}: Props) => (
	<>
		{showHeading && formOfWords.copy && (
			<>
				<ConsentHeading
					isSubsection={isSubsection}
					showToggleSwitch={showToggleSwitch}
				>
					<>
						{formOfWords.copy.heading1}
						{formOfWords.copy.straplineHeading && (
							<span className="consent-form__heading-strapline">
								{formOfWords.copy.straplineHeading}
							</span>
						)}
					</>
				</ConsentHeading>
				<div className="consent-form__intro-text">
					{formOfWords.copy.straplineSmall && formOfWords.copy.straplineSmall}
				</div>
			</>
		)}
		<FOWHiddenInputs formOfWords={formOfWords} />
		<div className="consent-form">
			<ConsentFields
				formOfWords={formOfWords}
				showToggleSwitch={showToggleSwitch || false}
			/>
			{!showToggleSwitch && <MoreInfo formOfWords={formOfWords} />}
			{showSubmitButton && <SubmitButton formOfWords={formOfWords} />}
			{showFooter && <Footer formOfWords={formOfWords} />}
		</div>
	</>
);

export default ConsentLite;
