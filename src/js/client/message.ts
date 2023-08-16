import oMessage from '@financial-times/o-message';

export interface ConsentMessageOptions {
	selector: string;
	hideOnInit?: boolean;
}

export class ConsentMessage {
	public element: HTMLElement;
	private _message: any;

	constructor(private options: ConsentMessageOptions) {
		const element = document.querySelector(
			`${this.options.selector} > .o-message`
		);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element as HTMLElement;

		this._message = new oMessage(this.element, {
			messageClass: 'o-message',
		});

		if (this.options.hideOnInit) {
			this.hide();
		}
	}

	public hide() {
		this.element.classList.add('consent-message--hidden');
	}

	public show() {
		this.element.classList.remove('consent-message--hidden');
	}

	public init(showMessage: boolean) {
		if (showMessage) {
			this.show();
		} else {
			this.hide();
		}
	}
}
