export namespace FowAPI {
	interface FreeForm {
		[x: string]: any;
	}

	export interface Channel extends FreeForm {
		label: string;
		channel: string;
		lbi: boolean;
	}

	export interface Category extends FreeForm {
		label: string;
		category: string;
		channels: Array<Channel>;
	}

	export interface Fow extends FreeForm {
		scope: string;
		id: string;
		copy?: any;
		consents: Array<Category>;
	}
}
