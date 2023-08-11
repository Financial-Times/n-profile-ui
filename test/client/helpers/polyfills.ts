import logger from '@dotcom-reliability-kit/logger';

process.on('unhandledRejection', (reason, p) => {
	// @ts-ignore
	const { stack } = reason;
	logger.info(
		'Unhandled Rejection at: Promise',
		{ p, reason, stack }
	);
});

beforeAll(() => {
	(window as any).Headers = class {
		constructor() {}
	};
	(window as any).Element.prototype.closest = function(selector) {
		let el = this;
		while (el) {
			if (el.matches(selector)) {
				return el;
			}
			el = el.parentElement;
		}
	};
});
