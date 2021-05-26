import * as React from 'react';
import {
	ConsentHeading,
	FOWHiddenInputs,
} from './';
import { FowAPI } from '../../types/fow-api';

interface Props {
	showHeading: boolean;
	showSubmitButton: boolean;
	isSubsection: boolean;
	formOfWords: FowAPI.Fow;
	label: string;
}

const ConsentFields = ({ formOfWords }) => (
	<div className="consent-form__section-wrapper">
		<div className="o-forms-field">
			<span className="o-forms-input o-forms-input--checkbox">
				{formOfWords.consents &&
					formOfWords.consents.map(
						({ category, label }) => (
							<CheckBox
								key={category}
								label={label}
								category={category}
							/>
						)
					)
				}
			</span>
		</div>
	</div>
);

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

const MoreInfo = () => (
	<div className="consent-form__consent-info-para">
		For more information about how we use your data, please refer to our
		<a className="consent-form__link--external"
			href="http://help.ft.com/help/legal-privacy/privacy/"
			target="_blank">&nbsp;privacy</a>
		&nbsp;and
		<a className="consent-form__link--external"
			href="http://help.ft.com/help/legal-privacy/cookies/"
			target="_blank">&nbsp;cookie</a>
		&nbsp;policies.
	</div>
);

const Footer = () => (
	<div className="manage-account-footer">
		<div>Need to change anything?</div>
		<a href="https://www.ft.com/myft/alerts">Manage your account</a>
	</div>
);

const SubmitButton = ({ formOfWords }) => (
	<div className="consent-form__submit-wrapper">
		<button
			type="submit"
			className="consent-form__submit o-buttons o-buttons--primary o-buttons--big"
		>
			{formOfWords.copy && formOfWords.copy.submitButton
				? formOfWords.copy.submitButton
				: 'Start Reading'}
		</button>
	</div>
);

const ConsentLite = ({
	showHeading,
	isSubsection,
	formOfWords,
	showSubmitButton,
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
					{formOfWords.copy.straplineSmall &&
						formOfWords.copy.straplineSmall}
				</div>
			</>
		)}
		<FOWHiddenInputs formOfWords={formOfWords} />
		<div className="consent-form">
			<ConsentFields formOfWords={formOfWords} />
			<MoreInfo />
			{showSubmitButton && (
				<SubmitButton formOfWords={formOfWords} />
			)}
			<Footer />
		</div>
	</>
);

export default ConsentLite;
