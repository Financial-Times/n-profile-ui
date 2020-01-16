import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessageCore, FOWHiddenInput } from '../';

const Settings = ({
	changesSaved,
	formOfWords,
	toggleOnLabel,
	toggleOffLabel
}) => (
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
		{formOfWords.errors && (
			<div className="t-settings-error consent-message-demo consent-message-demo--error margin-top-x4 margin-bottom-x5">
				<ErrorMessageCore error={formOfWords.errors} />
			</div>
		)}

		{formOfWords.copy.straplineSmall && (
			<div className="consent-form__intro-text">
				{formOfWords.copy.straplineSmall}
			</div>
		)}
		<FOWHiddenInput />
		<div name="consent" className="consent-form">
			{formOfWords.consents.map(
				({ label, linkText, linkUrl, subheadingLevel }) => (
					<React.Fragment key={linkUrl}>
						<div className="margin-bottom-x6">
							<Subheading
								label={label}
								linkText={linkText}
								linkUrl={linkUrl}
								subheadingLevel={subheadingLevel}
							/>
							<div>
								{item.channels.map((item, i) => (
									<React.Fragment key={i}>
										<YesNoSwitch
											key={item}
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

Settings.propTypes = {
	changesSaved: PropTypes.boolean,
	formOfWords: PropTypes.shape({
		error: PropTypes.string,
		copy: PropTypes.shape({
			heading1: PropTypes.string,
			straplineSmall: PropTypes.string,
			submitPreamble: PropTypes.string,
			submitButton: PropTypes.string
		}),
		consents: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string,
				linkText: PropTypes.string,
				linkUrl: PropTypes.string,
				subheadingLevel: PropTypes.number
			})
		)
	}),
	toggleOnLabel: PropTypes.bool,
	toggleOffLabel: PropTypes.bool
};

export default Settings;
