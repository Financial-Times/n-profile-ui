const stubFetch = require('./helpers/stub-fetch');
const initConsentForm = require('./helpers/init-consent-form');
const $ = require('jquery');
const sinon = require('sinon');

let afterFormSaved = () => { };

describe('Live consent form', () => {
	beforeEach(() => {
		initConsentForm(() => { afterFormSaved(); });
	});

	it('shows an updated switch value when the form is saved', async done => {
		stubFetch();
		expect($('#categoryB-channel1-yes').prop('checked')).toEqual(false);
		$('#categoryB-channel1-yes').click();
		afterFormSaved = () => {
			expect($('#categoryB-channel1-yes').prop('checked')).toEqual(true);
			done();
		};
	});

	it('redirects the page when the user\'s session has expired, and doesn\'t check the selected radio', async done => {
		const redirectLocation = '/login';
		stubFetch({ responseCode: 403 });
		const locationSpy = sinon.spy(window.location, 'assign');
		$('#categoryB-channel1-yes').click();
		afterFormSaved = () => {
			expect(locationSpy.calledWith(redirectLocation)).toEqual(true);
			expect($('#categoryB-channel1-yes').prop('checked')).toEqual(false);
			done();
		};
	});
});
