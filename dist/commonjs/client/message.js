'use strict';
let __importDefault = (this && this.__importDefault) || function (mod) {
	return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const o_message_1 = __importDefault(require('o-message'));
class ConsentMessage {
	constructor (options) {
		this.options = options;
		const element = document.querySelector(`${this.options.selector} > .o-message`);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element;
		this._message = new o_message_1.default(this.element, {
			messageClass: 'o-message'
		});
		if (this.options.hideOnInit) {
			this.hide();
		}
	}
	hide () {
		this.element.classList.add('consent-message--hidden');
	}
	show () {
		this.element.classList.remove('consent-message--hidden');
	}
	init (showMessage) {
		if (showMessage) {
			this.show();
		}
		else {
			this.hide();
		}
	}
}
exports.ConsentMessage = ConsentMessage;
