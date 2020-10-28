import React, { HTMLAttributes } from 'react';
import { default as classNames } from 'classnames';
import { FowAPI } from '../../types/fow-api';

interface Props extends FowAPI.Channel {
	category: string;
	elementAttrs?: HTMLAttributes<HTMLInputElement>;
	toggleOnLabel?: boolean;
	advisory?: string;
	checkedYes?: boolean;
	inputClass?: string;
	checkedNo?: boolean;
	toggleOffLabel?: boolean;
}

const YesNoSwitch = ({
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
}: Props) => {
	const yesCheckboxClasses = classNames('consent-form__radio-button', {
		inputClass
	});

	return (
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
								aria-label={`${toggleOnLabel || 'yes'}`}
								className={yesCheckboxClasses}
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
								{toggleOnLabel || 'Yes'}
							</span>
						</label>

						<label htmlFor={`${category}-${channel}-no`}>
							<input
								type="radio"
								name={`${
									lbi ? 'lbi' : 'consent'
								}-${category}-${channel}`}
								value="no"
								aria-label={`${toggleOffLabel || 'no'}`}
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
								{toggleOffLabel || 'No'}
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
};

export default YesNoSwitch;
