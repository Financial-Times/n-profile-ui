import * as React from 'react';

interface Props {
	lbi?: boolean;
	label: string;
	category: string;
	channel?: string;
	isLite?: boolean;
	heading?: string;
}

const ToggleSwitch = ({
	lbi,
	label,
	category,
	isLite = false,
	channel = 'byEmail',
	heading,
}: Props) => {
	const inputId = isLite
		? `${category}-toggleSwitch`
		: `input-${category}-${channel}`;
	const inputName = `${lbi ? 'lbi' : 'consent'}-${category}-${channel}`;
	const consentLabel = isLite ? (
		<>
			<span className="o-forms-input__label__main">{heading}</span>
			<span className="o-forms-input__label__prompt">{label}</span>
		</>
	) : (
		label
	);

	return (
		<label id={`${category}-${channel}`}>
			<input
				id={inputId}
				aria-labelledby={`${category}-${channel}`}
				name={inputName}
				type="checkbox"
				value="yes"
				defaultChecked
			/>
			<span
				className="o-forms-input__label"
				aria-labelledby={`${category}-${channel}`}
			>
				{consentLabel}
			</span>
			<input
				id={`${inputId}_hidden`}
				type="hidden"
				name={inputName}
				value="no"
			/>
		</label>
	);
};

export default ToggleSwitch;
