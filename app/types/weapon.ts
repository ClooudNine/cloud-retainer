import { Rares, Versions } from '@/app/types/common';

export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Catalyst' | 'Bow';

export interface Weapon {
	id: number;
	title: string;
	rare: Rares;
	type: WeaponType;
	in_standard_wish: boolean;
	appearance_version: Versions;
}
