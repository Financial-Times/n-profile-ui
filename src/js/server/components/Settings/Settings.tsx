import * as React from 'react';
import {
	ErrorMessageCore,
	Subheading,
	FOWHiddenInputs,
	YesNoSwitch
} from '../';
import { FowAPI } from '../../../types/fow-api';

interface Props {
	changesSaved: boolean;
	formOfWords: FowAPI.Fow;
	toggleOnLabel: boolean;
	showSubmitButton: boolean;
	toggleOffLabel: boolean;
}

const Settings = ({
	changesSaved,
	formOfWords,
	toggleOnLabel,
	toggleOffLabel,
	showSubmitButton
}: Props) => (
	<>
		{formOfWords.copy.heading1 && (
			<h1 className="consent-form__heading-level-1">
				{formOfWords.copy.heading1}
			</h1>
		)}
		{changesSaved && (
			<div className="t-settings-saved margin-top-x4 margin-bottom-x5">
				changes-saved-messages
			</div>
		)}
		{formOfWords.error && (
			<div className="t-settings-error consent-message-demo consent-message-demo--error margin-top-x4 margin-bottom-x5">
				<ErrorMessageCore />
			</div>
		)}

		{formOfWords.copy.straplineSmall && (
			<div className="consent-form__intro-text">
				{formOfWords.copy.straplineSmall}
			</div>
		)}
		<FOWHiddenInputs formOfWords={formOfWords} />
		<div className="consent-form">
			{formOfWords.consents.map(
				({
					category,
					channels,
					label,
					linkText,
					linkUrl,
					subheadingLevel
				}) => (
					<React.Fragment key={linkUrl}>
						<div className="margin-bottom-x6">
							<Subheading
								channels={channels}
								category={category}
								linkText={linkText}
								linkUrl={linkUrl}
								subheadingLevel={subheadingLevel}
								text={label}
								trackable=""
							/>
							<div>
								{channels.map((channel, i) => (
									<React.Fragment key={i}>
										<YesNoSwitch
											{...channel}
											category={category}
											toggleOnLabel={toggleOnLabel}
											toggleOffLabel={toggleOffLabel}
										/>
									</React.Fragment>
								))}
							</div>
						</div>
					</React.Fragment>
				)
			)}
			{formOfWords.copy.submitPreamble && formOfWords.copy.submitPreamble}
			{showSubmitButton && !formOfWords.error && (
				<div className="consent-form__submit-wrapper">
					<button
						type="submit"
						className="consent-form__submit o-buttons o-buttons--primary o-buttons--big"
					>
						{formOfWords.copy.submitButton
							? formOfWords.copy.submitButton
							: 'Confirm'}
					</button>
				</div>
			)}
		</div>
	</>
);

export default Settings;
