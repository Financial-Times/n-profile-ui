export namespace FowAPI {
	export interface Channel {
		label: string;
		channel: string;
		lbi: boolean;
	}

	export interface Category {
		label: string;
		category: string;
		channels: Array<Channel>;
		heading?: string;
		linkText?: string;
		linkUrl?: string;
		subheadingLevel?: string;
	}

	export interface Fow {
		scope: string;
		id: string;
		moreInfoCustom?: string;
		copy: {
			serviceMessagesInfo: string;
			heading1: string;
			straplineSmall: string;
			straplineHeading?: string;
			submitPreamble?: string;
			submitButton?: string;
		};
		source: string;
		error?: string;
		consents: Array<Category>;
	}
}
