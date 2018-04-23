import * as sinon from 'sinon';
import * as helpers from '../src/js/helpers';

describe('helper functions', () => {
	let sandbox: sinon.SinonSandbox;
	let stubs: any;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('validates consent field names', () => {
		[
			'consent-category-channel',
			'lbi-category-channel'
		].map(fieldName => sinon.assert.match(helpers.isConsentField(fieldName), true));
		[
			'consent-cate&gory-channel',
			'thing-category-channel-etc'
		].map(fieldName => sinon.assert.match(helpers.isConsentField(fieldName), false));
	});
});
