'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const o_message_1 = require('o-message');
class ConsentMessage {
	constructor (opts) {
		const element = document.querySelector(opts.selector);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element;
		this._message = new o_message_1.default(element);
		if (opts.hideOnInit) {
			this.hide();
		}
	}
	hide () {
		this.element.style.display = 'none';
	}
	show () {
		this.element.style.display = 'block';
	}
	init (show) {
		this._message.init();
		if (show) {
			this.show();
		}
	}
}
exports.ConsentMessage = ConsentMessage;
