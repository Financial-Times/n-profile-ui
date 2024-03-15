import { FowAPI } from './fow-api';

export namespace ConsentModelData {
	export interface Radio {
		lbi: boolean;
		channel: string;
		category: string;
	}

	export interface Channel extends FowAPI.Channel {
		checkedYes: boolean;
		checkedNo: boolean;
	}

	export type KeyedValues = Record<string, string | string[]>;
}
