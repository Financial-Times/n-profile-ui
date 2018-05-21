import oMessage from 'o-message';
export class ConsentMessage {
	constructor (options) {
		this.options = options;
		const element = document.querySelector(`${this.options.selector} > .consent-message`);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element;
		this._message = new oMessage(this.element, {
			messageClass: 'consent-message'
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
	init () {
		if (this.options.hideOnInit) {
			this.hide();
		}
	}
}
