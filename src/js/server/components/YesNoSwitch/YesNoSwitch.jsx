import React from 'react';
import PropTypes from 'prop-types';

export const YesNoSwitch = ({
	label,
	category,
	channel,
	advisory,
	lbi,
	checkedYes,
	checkedNo,
	elementAttrs,
	inputClass,
	toggleOnLabel,
	toggleOffLabel
}) => (
	<fieldset className="consent-form__fieldset">
		<legend className="o-normalise-visually-hidden">{label}</legend>
		<div className="o-forms-field o-forms-field--inline">
			<span className="o-forms-title">
				<span
					className="o-forms-title__main"
					id={`legend-${category}-${channel}`}
					aria-hidden="true"
				>
					{label}
				</span>
				{advisory && (
					<div className="consent-form__item-advisory">
						{advisory}
					</div>
				)}
			</span>
			<span className="o-forms-input o-forms-input--radio-box">
				<div className="o-forms-input--radio-box__container">
					<label htmlFor={`${category}-${channel}-yes`}>
						<input
							type="radio"
							name={`${
								lbi ? 'lbi' : 'consent'
							}-${category}-${channel}`}
							value="yes"
							className={`consent-form__radio-button ${inputClass &&
								inputClass}`}
							id={`${category}-${channel}-yes`}
							aria-describedby={`legend-${category}-${channel}`}
							data-trackable={`${
								lbi ? 'lbi' : 'consent'
							}-${category}-${channel}-yes`}
							checked={checkedYes}
							{...elementAttrs}
						/>
						<span
							className="o-forms-input__label"
							aria-hidden="true"
						>
							{toggleOnLabel ? toggleOnLabel : 'Yes'}
						</span>
					</label>

					<label htmlFor={`${category}-${channel}-no`}>
						<input
							type="radio"
							name={`${
								lbi ? 'lbi' : 'consent'
							}-${category}-${channel}`}
							value="no"
							className="consent-form__radio-button consent-form__radio-button--negative"
							id={`${category}-${channel}-no`}
							aria-describedby={`legend-${category}-${channel}`}
							data-trackable={`${
								lbi ? 'lbi' : 'consent'
							}-${category}-${channel}-no`}
							checked={checkedNo}
							{...elementAttrs}
						/>
						<span
							className="o-forms-input__label"
							aria-hidden="true"
						>
							{toggleOffLabel ? toggleOffLabel : 'No'}
						</span>
					</label>
				</div>
				<div
					className="o-forms-input__state"
					aria-hidden="false"
					aria-live="polite"
				></div>
				<div className="o-forms-input__error">
					There was a problem saving, please try later.
				</div>
			</span>
		</div>
	</fieldset>
);

YesNoSwitch.propTypes = {
	label: PropTypes.string,
	category: PropTypes.string,
	channel: PropTypes.string,
	advisory: PropTypes.string,
	lbi: PropTypes.bool,
	checkedYes: PropTypes.bool,
	checkedNo: PropTypes.bool,
	elementAttrs: PropTypes.object,
	inputClass: PropTypes.string,
	toggleOnLabel: PropTypes.string,
	toggleOffLabel: PropTypes.string
};

export default YesNoSwitch;
