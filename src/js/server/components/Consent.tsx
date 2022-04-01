// TODO:  We've added showToggleSwitch flag  for the new design we are A/B testing. https://financialtimes.atlassian.net/browse/ACQ-1472
// Depending on the results from this test we will update the code in this component accordingly.
import * as React from 'react';
import {
	ConsentHeading,
	ErrorMessageCore,
	FOWHiddenInputs,
	YesNoSwitch,
} from './';
import { FowAPI } from '../../types/fow-api';

interface Props {
	showHeading: boolean;
	showSubmitButton: boolean;
	isSubsection: boolean;
	showToggleSwitch: boolean;
	formOfWords: FowAPI.Fow;
}

const formFieldsClassName = (showToggleSwitch) => {
	return showToggleSwitch
		? 'o-forms-input o-forms-input--toggle'
		: 'consent-form__switches-group';
};

const ChannelHeading = ({ heading, isSubsection, showToggleSwitch }) => {
	if (isSubsection) {
		if (showToggleSwitch) {
			return <h6 className="consent-form__heading-level-6">{heading}</h6>;
		}
		return <h3 className="consent-form__heading-level-3">{heading}</h3>;
	}

	return <h2 className="consent-form__heading-level-3">{heading}</h2>;
};

const ToggleSwitch = ({ lbi, label, category, channel }) => {
	return (
		<label>
			<input
				id={`${category}-${channel}`}
				name={`${lbi ? 'lbi' : 'consent'}-${category}-${channel}`}
				type="checkbox"
				value="yes"
				defaultChecked
			/>
			<span className="o-forms-input__label">{label}</span>
		</label>
	);
};

const Consent = ({
	showHeading,
	isSubsection,
	formOfWords,
	showSubmitButton,
	showToggleSwitch,
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
		{formOfWords.error && (
			<div className="consent-message-demo consent-message-demo--error margin-bottom-x5">
				<ErrorMessageCore detail={formOfWords.error} />
			</div>
		)}
		<FOWHiddenInputs formOfWords={formOfWords} />
		<div className="consent-form">
			<div className="consent-form__section-wrapper">
				{formOfWords.consents &&
					formOfWords.consents.map(({ category, channels, heading, label }) => (
						<div className="consent-form__section" key={heading}>
							<ChannelHeading
								heading={heading}
								isSubsection={isSubsection}
								showToggleSwitch={showToggleSwitch}
							/>
							<div className="consent-form__section-label consent-form__limit-width">
								{label}
							</div>
							<div className={`${formFieldsClassName(showToggleSwitch)}`}>
								{channels.map(({ label, ...rest }) => {
									return showToggleSwitch ? (
										<ToggleSwitch
											key={category}
											label={label}
											category={category}
											{...rest}
										/>
									) : (
										<YesNoSwitch
											key={label}
											category={category}
											label={label}
											{...rest}
										/>
									);
								})}
							</div>
						</div>
					))}
			</div>
			{formOfWords.copy && formOfWords.copy.serviceMessagesInfo && (
				<div
					className="consent-form__consent-info margin-top-x8"
					dangerouslySetInnerHTML={{
						__html: formOfWords.copy.serviceMessagesInfo,
					}}
				/>
			)}
			{showSubmitButton && (
				<div className="consent-form__submit-wrapper">
					<button
						type="submit"
						className="consent-form__submit o-buttons o-buttons--primary o-buttons--big"
					>
						{formOfWords.copy && formOfWords.copy.submitButton
							? formOfWords.copy.submitButton
							: 'Confirm'}
					</button>
				</div>
			)}
		</div>
	</>
);

export default Consent;
