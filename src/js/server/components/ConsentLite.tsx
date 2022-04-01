// TODO:  We've added showToggleSwitch flag  for the new design we are A/B testing. https://financialtimes.atlassian.net/browse/ACQ-1472
// Depending on the results from this test we will update the code in this component accordingly.

import * as React from 'react';
import { ConsentHeading, FOWHiddenInputs } from './';
import { FowAPI } from '../../types/fow-api';

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
							/>
						) : (
							<CheckBox key={category} label={label} category={category} />
						);
					})}
			</span>
		</div>
	</div>
);

const ToggleSwitch = ({ label, category, heading }) => {
	return (
		<label>
			<input
				id={`${category}-toggleSwitch`}
				type="checkbox"
				name={`consent-${category}-byEmail`}
				value="yes"
				defaultChecked
			/>
			<span className="o-forms-input__label">
				<span className="o-forms-input__label__main">{heading}</span>
				<span className="o-forms-input__label__prompt">{label}</span>
			</span>
		</label>
	);
};

const CheckBox = ({ label, category }) => {
	return (
		<label htmlFor={category}>
			<input
				id={category}
				type="checkbox"
				name={`consent-${category}-byEmail`}
				value="yes"
				defaultChecked
			/>
			<span className="o-forms-input__label">{label}</span>
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
		default:
			return defaultMoreInfo({});
	}
};

const Footer = ({ serviceMessagesInfo }) =>
	serviceMessagesInfo || (
		<div className="manage-account-footer">
			<div>Need to change anything?</div>
			<a href="https://www.ft.com/myft/alerts">Manage your account</a>
		</div>
	);

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
				<ConsentHeading isSubsection={isSubsection}>
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
			{showFooter && (
				<Footer serviceMessagesInfo={formOfWords.copy.serviceMessagesInfo} />
			)}
		</div>
	</>
);

export default ConsentLite;
