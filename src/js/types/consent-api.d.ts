export interface Channel {
	status: boolean;
	lbi: boolean;
	fow: string;
	source: string;
}

export type Category = Record<string, Channel>;

export type ConsentRecord = Record<string, Category>;
