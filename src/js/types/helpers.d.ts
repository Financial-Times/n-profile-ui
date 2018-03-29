import { FowAPI } from './fow-api';
import { ConsentAPI } from './consent-api';

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
	
	export interface KeyedValues {
		[name: string]: string;
	}	
}
