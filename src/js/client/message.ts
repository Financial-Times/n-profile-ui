import oMessage from 'o-message';

export interface ConsentMessageOptions {
	selector: string;
	hideOnInit?: boolean;
}

export class ConsentMessage {
	public element: HTMLElement;
	private _message: any;

	constructor(private options: ConsentMessageOptions) {
		const element = document.querySelector(this.options.selector);
		if (!element) {
			throw new Error('Invalid selector');
		}
		this.element = element as HTMLElement;
		this._message = new oMessage(element);

		if(this.options.hideOnInit) {
			this.hide();
		}
	}

	public hide() {
		this.element.style.display = 'none';
	}

	public show() {
		this.element.style.display = 'block';
	}

	public init() {
		this._message.init();
		if(this.options.hideOnInit) {
			this.show();
		}
	}
}
