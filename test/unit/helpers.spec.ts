import * as sinon from 'sinon';
import * as helpers from '../../src/js/helpers';

import { clone, fixtures } from './util';

Object.defineProperty(document, 'cookie', { value: '', writable: true });

describe('helper functions', () => {
	let sandbox: sinon.SinonSandbox;
	const category = 'testCategory';
	const channel = 'testChannel';
	const source = fixtures.consentRecord.categoryA.channel1.source;
	const elementAttrs = [{ name: 'required' }];

	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('validates consent field names', () => {
		[`consent-${category}-${channel}`, `lbi-${category}-${channel}`].map(
			fieldName => sinon.assert.match(helpers.isConsentField(fieldName), true)
		);
		['consent-cate&gory-channel', 'thing-category-channel-etc'].map(fieldName =>
			sinon.assert.match(helpers.isConsentField(fieldName), false)
		);
	});

	it('extracts correct meta data from consent field names', () => {
		sinon.assert.match(
			helpers.extractMetaFromString(`consent-${category}-${channel}`),
			{
				lbi: false,
				channel,
				category
			}
		);
		sinon.assert.match(
			helpers.extractMetaFromString(`lbi-${category}-${channel}`),
			{
				lbi: true,
				channel,
				category
			}
		);
	});

	it('decorates a form of words channel with the correct attributes', () => {
		const fowChannel = clone(fixtures.formOfWords.consents[0].channels[0]);
		const consentChannel = clone(fixtures.consentRecord.categoryA.channel1);

		[true, false].forEach(status => {
			consentChannel.status = status;
			sinon.assert.match(
				helpers.decorateChannel({
					fowChannel,
					consentChannel,
					elementAttrs
				}),
				sinon.match({
					checkedYes: status,
					checkedNo: !status,
					elementAttrs
				})
			);
		});
	});

	it('populates a consent view model based on form of words and consent record', () => {
		sinon.assert.match(
			helpers.populateConsentModel({
				fow: clone(fixtures.formOfWords),
				consent: clone(fixtures.consentRecord),
				source,
				elementAttrs
			}),
			fixtures.viewModel.basedOnRecord
		);
	});

	it('populates a consent view model based on form of words and granular consent', () => {
		sinon.assert.match(
			helpers.populateConsentModel({
				fow: clone(fixtures.formOfWords),
				consent: clone(fixtures.consentRecord.categoryA.channel1),
				source,
				elementAttrs
			}),
			fixtures.viewModel.basedOnGranularConsent
		);
	});

	it('validates consent attributes against a form of words', () => {
		const fow = clone(fixtures.formOfWords);

		sinon.assert.match(
			helpers.validateConsent(fow, 'categoryA', 'channel1'),
			true
		);

		try {
			helpers.validateConsent(fow, 'invalidCategory', 'channel1');
		} catch (error) {
			sinon.assert.match(
				error.message,
				sinon.match('Category invalidCategory does not match form of words')
			);
		}

		try {
			helpers.validateConsent(fow, 'categoryA', 'invalidChannel');
		} catch (error) {
			sinon.assert.match(
				error.message,
				sinon.match('Channel invalidChannel does not match form of words')
			);
		}
	});

	it('builds a consent record based on a form of words and consent fields', () => {
		const fow = fixtures.formOfWords.id;
		const consentFields = {
			'lbi-categoryA-channel1': 'no',
			'lbi-categoryB-channel1': 'yes',
			'consent-categoryB-channel2': 'yes'
		};
		const expectedResult = clone(fixtures.consentRecord);
		delete expectedResult.categoryA.channel1.lastModified;
		delete expectedResult.categoryB.channel1.lastModified;
		delete expectedResult.categoryB.channel2.lastModified;

		sinon.assert.match(
			helpers.buildConsentRecord(fow, consentFields, source),
			expectedResult
		);
	});

	describe.only('cookie handling', () => {
		const consentObject = {
			categoryName: {
				channelName: {
					status: true,
					lbi: true,
					fow: 'testFow',
					source: 'testSource'
				}
			}
		};

		const mockCookie = (value: string): string =>
			`FTConsent=${value}; domain=.ft.com; path=/; max-age=2592000000`;

		beforeEach(() => {
			document.cookie = '';
		});

		it('sets a cookie based on consent with default cookie values', () => {
			helpers.updateConsentCookie(consentObject);
			sinon.assert.match(
				document.cookie,
				sinon.match('FTConsent=categorynameChannelname:on')
			);
			sinon.assert.match(document.cookie, sinon.match('domain=.ft.com'));
			sinon.assert.match(document.cookie, sinon.match('path=/'));
			sinon.assert.match(document.cookie, sinon.match(/max-age=\d*/));
		});

		it('sets a cookie based on consent with custom options', () => {
			helpers.updateConsentCookie(consentObject, {
				name: 'foo',
				domain: 'bar',
				path: '/baz',
				maxAge: 1
			});
			sinon.assert.match(
				document.cookie,
				sinon.match('foo=categorynameChannelname:on')
			);
			sinon.assert.match(document.cookie, sinon.match('domain=bar'));
			sinon.assert.match(document.cookie, sinon.match('path=/baz'));
			sinon.assert.match(document.cookie, sinon.match('max-age=1'));
		});

		it('updates a cookie if the value exists', () => {
			document.cookie = mockCookie('categorynameChannelname:off');
			helpers.updateConsentCookie(consentObject);
			sinon.assert.match(
				document.cookie,
				sinon.match('FTConsent=categorynameChannelname:on')
			);
		});

		it('appends to a cookie if the value does not exist', () => {
			document.cookie = mockCookie('otherThing:off');
			helpers.updateConsentCookie(consentObject);
			sinon.assert.match(
				document.cookie,
				sinon.match('FTConsent=otherThing:off,categorynameChannelname:on')
			);
		});

		it('only updates the relevant value', () => {
			document.cookie = mockCookie(
				'otherThing:off,categorynameChannelname:on,foo:on'
			);
			helpers.updateConsentCookie(consentObject);
			sinon.assert.match(
				document.cookie,
				sinon.match(
					'FTConsent=otherThing:off,categorynameChannelname:on,foo:on'
				)
			);
		});
	});
});
