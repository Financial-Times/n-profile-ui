export namespace ConsentAPI {
	export interface Channel {
		status: boolean;
		lbi: boolean;
		fow: string;
		source: string;
	}

	export interface Category {
		[name: string]: Channel;
	}

	export interface Record {
		[name: string]: Category;
	}
}
