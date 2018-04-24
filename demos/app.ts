import { Application, Request, Response } from 'express';
import { Server } from 'http';
import * as express from '@financial-times/n-internal-tool';
import * as chalk from 'chalk';

import * as helpers from '../src/js/helpers';

const fow = require('./fixtures/fow.json');
const consentRecord = require('./fixtures/consent-record.json');

const { red: errorHighlight, green: highlight } = chalk.default.bold;

const app = express({
	name: 'public',
	systemCode: 'n-profile-ui-demo',
	defaultLayout: 'wrapper',
	viewsDirectory: '/demos/views',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	demo: true,
	s3o: false
}) as Application;

function render(title: string,
	{
		consentRecord,
		elementAttrs
	}: any = {}
) {
	return function(req: Request, res: Response): void {
		res.render(`demo-${title}`, {
			title,
			formOfWords: helpers.populateConsentModel({
				fow,
				source: 'n-profile-ui-demo',
				consent: consentRecord,
				elementAttrs
			}),
			showHeading: true,
			showSubmitButton: true
		});
	};
}

app.get('/message', render('message'));
app.get('/live-update', render('live-update'));

const elementAttrs = [{ name: 'required' }];
app.get('/update-on-save', render('update-on-save', {
	consentRecord, elementAttrs
}));

function runPa11yTests(): void {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data: Object) => {
		// tslint:disable-next-line
		console.log(highlight(`${data}`)); // eslint-disable-line
	});

	pa11y.stderr.on('data', (error: Object) => {
		// tslint:disable-next-line
		console.log(errorHighlight(`${error}`)); // eslint-disable-line
	});

	pa11y.on('close', (code: number) => {
		process.exit(code);
	});
}

const server = app.listen(5005, () => {
	if (process.env.PA11Y === 'true') {
		runPa11yTests();
	}
});

export default app;
