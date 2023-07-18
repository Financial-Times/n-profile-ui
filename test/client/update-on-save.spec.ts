import { UpdateConsentOnSave } from '../../src/js/client/update-on-save';
import * as sinon from 'sinon';
import { JSDOM } from 'jsdom';
const formOfWords = require('../fixtures/form-of-words.json');
import { loadHTML } from './helpers/load-html';

describe('helper functions', () => {
	beforeEach(() => {
		document.body.innerHTML = loadHTML({
			formOfWords: { ...formOfWords, source: 'test' },
			showToggleSwitch: true,
		});
	});

	it('test_radio_and_checkbox_values', () => {
		const form = new UpdateConsentOnSave({
			selector: '.js-consent-preference',
		});

		const consentRecord = form.values;
		expect(consentRecord).toEqual({
			categoryA: {
				channel1: {
					status: true,
					lbi: false,
					source: 'test',
					fow: 'testFow/testVersion',
                    
				},
                channel2: {
					status: true,
					lbi: false,
					source: 'test',
					fow: 'testFow/testVersion',
				},
                channel3: {
					status: true,
					lbi: false,
					source: 'test',
					fow: 'testFow/testVersion',
				},
			},
			categoryB: {
                channel1: {
					status: true,
					lbi: false,
					source: 'test',
					fow: 'testFow/testVersion',
                    
				},
				channel2: {
					status: true,
					lbi: false,
					source: 'test',
					fow: 'testFow/testVersion',
				},
                channel3: {
					status: true,
					lbi: false,
					source: 'test',
					fow: 'testFow/testVersion',
                    
				},
			},
		});
	});
});
