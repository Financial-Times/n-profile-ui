import * as sinon from 'sinon';
import stubFetch from './helpers/stub-fetch';
import initConsentForm from './helpers/init-consent-form';

describe('Live consent form', () => {
	beforeEach(() => {
		initConsentForm(() => { () => { } });
	});

	const radioButton = (): HTMLInputElement => document.querySelector('#categoryB-channel1-yes');

	const radioButtonGreatGrandparentElement = () => document.querySelector('#categoryB-channel1-yes').parentElement.parentElement.parentElement;

	it('applies relevant classes to elements at respective stages of data being saved', () => {
		stubFetch();

		let inputGreatGrandparentClassList

		inputGreatGrandparentClassList = [...radioButtonGreatGrandparentElement().classList];

		expect(inputGreatGrandparentClassList).toEqual(expect.arrayContaining(['o-forms-input', 'o-forms-input--radio-box']));
		expect(inputGreatGrandparentClassList).not.toEqual(expect.arrayContaining(['o-forms-input--saving']));
		expect(inputGreatGrandparentClassList).not.toEqual(expect.arrayContaining(['o-forms-input--saved']));

		radioButton().click();

		inputGreatGrandparentClassList = [...radioButtonGreatGrandparentElement().classList];

		expect(inputGreatGrandparentClassList).toEqual(expect.arrayContaining(['o-forms-input', 'o-forms-input--radio-box', 'o-forms-input--saving']));
		expect(inputGreatGrandparentClassList).not.toEqual(expect.arrayContaining(['o-forms-input--saved']));
	});

	it('redirects the page when the user\'s session has expired', done => {
		const redirectLocation = '/login';
		stubFetch({ responseCode: 403 });
		const locationStub = sinon.stub(window.location, 'assign');

		locationStub.callsFake(location => {
			expect(location).toEqual(redirectLocation);
			done();
		});

		radioButton().click();
	});
});
