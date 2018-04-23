import oMessage from 'o-message';

export interface ConsentMessageOptions {
	selector: string;
	hideOnInit?: boolean;
}

export class ConsentMessage {
	public element: HTMLElement;
	private _message: any;

	constructor(opts: ConsentMessageOptions) {
		const element = document.querySelector(opts.selector);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element as HTMLElement;
		this._message = new oMessage(element);

		if(opts.hideOnInit) {
			this.hide();
		}
	}

	public hide() {
		this.element.style.display = 'none';
	}

	public show() {
		this.element.style.display = 'block';
	}

	public init(show?: boolean) {
		this._message.init();
		if(show) {
			this.show();
		}
	}
}
