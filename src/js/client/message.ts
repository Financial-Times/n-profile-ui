import oMessage from 'o-message';

export interface ConsentMessageOptions {
	selector: string;
	hideOnInit?: boolean;
}

export class ConsentMessage {
	public element: HTMLElement;
	private _message: any;

	constructor(private options: ConsentMessageOptions) {
		const element = document.querySelector(`${this.options.selector} > .consent-message`);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element as HTMLElement;

		this._message = new oMessage(this.element, {
			messageClass: 'consent-message'
		});

		if(this.options.hideOnInit) {
			this.hide();
		}
	}

	public hide() {
		this.element.classList.add('consent-message--hidden');
	}

	public show() {
		this.element.classList.remove('consent-message--hidden');
	}

	public init() {
		if(this.options.hideOnInit) {
			this.hide();
		}
	}
}
