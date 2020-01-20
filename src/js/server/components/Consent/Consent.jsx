import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessageCore, FOWHiddenInputs, YesNoSwitch } from '../';

const Heading = ({ children, isSubsection }) => isSubsection ? <h2 className="consent-form__heading-level-1">{children}</h2> : <h2 className="consent-form__heading-level-1">{children}</h2>

const Consent = ({
	showHeading,
	isSubsection,
	formOfWords = {},
	showSubmitButton
}) => (
		<>
			{showHeading && (
				<>
					<Heading isSubsection={isSubsection}>
						{formOfWords.copy.heading1}
						{formOfWords.copy.straplineHeading && (
							<span className="consent-form__heading-strapline">
								{formOfWords.copy.straplineHeading}
							</span>
						)}
					</Heading>
					<div className="consent-form__intro-text">
						{formOfWords.copy.straplineSmall &&
							formOfWords.copy.straplineSmall}
					</div>
				</>
			)}
			{formOfWords.error && (
				<div className="consent-message-demo consent-message-demo--error margin-bottom-x5">
					<ErrorMessageCore highlight={formOfWords.error} />
				</div>
			)}
			<FOWHiddenInputs formOfWords={formOfWords} />
			<div className="consent-form">
				<div className="consent-form__section-wrapper">
					{formOfWords.consents &&
						formOfWords.consents.map(
							({ category, channels, heading, label }) => (
								<div
									className="consent-form__section"
									key={heading}
								>
									{isSubsection ? (
										<h3 className="consent-form__heading-level-3">
											{heading}
										</h3>
									) : (
										<h2 className="consent-form__heading-level-3">
											{heading}
										</h2>
									)}
									<div className="consent-form__section-label consent-form__limit-width">
										{label}
									</div>
									<div className="consent-form__switches-group">
										{channels.map(({ label, ...rest}) => (
											<YesNoSwitch
												key={label}
												category={category}
												label={label}
												{...rest}
											/>
										))}
									</div>
								</div>
							)
						)}
				</div>
				{formOfWords.copy && formOfWords.copy.serviceMessagesInfo && (
					<div className="consent-form__consent-info margin-top-x8" dangerouslySetInnerHTML={{__html: formOfWords.copy.serviceMessagesInfo }}/>
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

Consent.propTypes = {
	showHeading: PropTypes.bool,
	showSubmitButton: PropTypes.bool,
	isSubsection: PropTypes.bool,
	formOfWords: PropTypes.shape({
		copy: PropTypes.shape({
			heading1: PropTypes.string,
			straplineHeading: PropTypes.string,
			straplineSmall: PropTypes.string,
			serviceMessagesInfo: PropTypes.string,
			submitButton: PropTypes.string
		}),
		consents: PropTypes.arrayOf(
			PropTypes.shape({
				category: PropTypes.string,
				channels: PropTypes.arrayOf(PropTypes.object),
				heading: PropTypes.string,
				label: PropTypes.string
			})
		),
		error: PropTypes.string
	})
};

export default Consent;
