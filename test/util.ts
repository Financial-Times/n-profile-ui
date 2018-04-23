export const fixtures = {
	formOfWords: require('./fixtures/form-of-words'),
	consentRecord: require('./fixtures/consent-record'),
	viewModel: {
		basedOnRecord: require('./fixtures/consent-view-model-record'),
		basedOnGranularConsent: require('./fixtures/consent-view-model-granular')
	}
};

export function clone (obj: any): any {
	return JSON.parse(JSON.stringify(obj));
}
