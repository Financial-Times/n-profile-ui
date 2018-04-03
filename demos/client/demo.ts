import {
	LiveUpdateConsent,
	UpdateConsentOnSave
} from '../../src/js/client/main';

let component;

const selector = '.demo-consent__component';
const output = document.querySelector('.demo-consent__output-results');
document
	.querySelector('.demo-consent__output-clear')
	.addEventListener('click', () => {
		output.innerHTML = '';
	});

const logOutput = (message: string, payload: any): void => {
	const now = new Date();
	let title = document.createElement('p');
	title.innerHTML = `${now.toLocaleTimeString('en-GB')} - ${message}:`;

	let code = document.createElement('pre');
	code.innerHTML = JSON.stringify(payload, null, 2);

	output.insertBefore(code, output.firstChild);
	output.insertBefore(title, output.firstChild);
};

if (document.querySelector('[data-consent-component=\'live-update\']')) {
	component = new LiveUpdateConsent({ selector });
	component.onChange((consent, e) => {
		const msg = 'Change event triggered';
		logOutput(msg, consent);
		// tslint:disable-next-line
		console.log(msg, consent, e.target);
	});
} else if (
	document.querySelector('[data-consent-component=\'update-on-save\']')
) {
	component = new UpdateConsentOnSave({
		selector,
		checkValidityBeforeSubmit: true
	});
	component.onChange((consent, e) => {
		const msg = `Input changed (form valid: ${component.checkValidity()})`;
		logOutput(msg, consent);
		// tslint:disable-next-line
		console.log(msg, consent, e.target);
	});
	component.onSubmit((consent, e) => {
		const msg = 'Submit event triggered';
		logOutput(msg, consent);
		// tslint:disable-next-line
		console.log(msg, consent, e.target);
	});
}
