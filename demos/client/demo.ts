import {
	LiveUpdateConsent,
	UpdateConsentOnSave,
	ConsentMessage
} from '../../src/js/client/main';

let component;

const selector = '.demo-consent__component';
const output = document.querySelector('.demo-consent__output-results') as HTMLDivElement;
const clear = document.querySelector('.demo-consent__output-clear');
if (clear) {
	clear.addEventListener('click', () => {
		output.innerHTML = '';
	});
}

const logOutput = (message: string, payload: any): void => {
	const now = new Date();
	let title = document.createElement('p');
	title.innerHTML = `${now.toLocaleTimeString('en-GB')} - ${message}:`;

	let code = document.createElement('pre');
	code.innerHTML = JSON.stringify(payload, null, 2);

	output.insertBefore(code, output.firstChild);
	output.insertBefore(title, output.firstChild);
};

if (document.querySelector('[data-consent-component="live-update"]')) {

	component = new LiveUpdateConsent({ selector });
	component.onChange((consent, e) => {
		const message = 'Change event triggered';
		logOutput(message, consent);
		// tslint:disable-next-line
		console.log(message, consent, e.target);
		return Promise.resolve('success');
	});

} else if (document.querySelector('[data-consent-component="update-on-save"]')) {

	component = new UpdateConsentOnSave({
		selector,
		checkValidityBeforeSubmit: true
	});
	component.onChange((consent, e) => {
		const message = `Input changed (form valid: ${component.checkValidity()})`;
		logOutput(message, consent);
		// tslint:disable-next-line
		console.log(message, consent, e.target);
	});
	component.onSubmit((consent, e) => {
		const message = 'Submit event triggered';
		logOutput(message, consent);
		// tslint:disable-next-line
		console.log(message, consent, e.target);
	});

} else if (document.querySelector('[data-consent-component="messages"]')) {

	component = {
		success: new ConsentMessage({
			selector: '.consent-message-demo',
			hideOnInit: true
		}),
		error:  new ConsentMessage({
			selector: '.consent-message-demo--error',
			hideOnInit: true
		})
	};

	component.success.init(true);
	component.error.init(true);

}
