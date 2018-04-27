const logger = require('@financial-times/n-logger');

process.on('unhandledRejection', (reason, p) => {
	logger.info('Unhandled Rejection at: Promise', p, 'reason:', reason, 'stack:', reason.stack);
});

beforeAll(() => {
	window.Headers = class {
		constructor () { }
	};
	window.Element.prototype.closest = function (selector) {
		let el = this;
		while (el) {
			if (el.matches(selector)) {
				return el;
			}
			el = el.parentElement;
		}
	};
});
