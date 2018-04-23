'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const o_message_1 = require('o-message');
class ConsentMessage {
	constructor (options) {
		this.options = options;
		const element = document.querySelector(this.options.selector);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element;
		this._message = new o_message_1.default(element);
		if (this.options.hideOnInit) {
			this.hide();
		}
	}
	hide () {
		this.element.style.display = 'none';
	}
	show () {
		this.element.style.display = 'block';
	}
	init () {
		this._message.init();
		if (this.options.hideOnInit) {
			this.show();
		}
	}
}
exports.ConsentMessage = ConsentMessage;
