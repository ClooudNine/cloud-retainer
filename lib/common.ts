import { Elements, Phases } from '@/lib/db/schema';

export type EpitomizedStats = { weaponId: number; count: number };
export type EpitomizedPath = { [key: string]: EpitomizedStats };
export type PullCurrency = 'intertwined-fate' | 'acquaint-fate';
export type PurchasesCurrency =
    | 'primogems'
    | 'masterless-stardust'
    | 'masterless-starglitter';
export type Balance = PullCurrency | PurchasesCurrency;
export const currentGameVersion: number = 4.1;
export const currentGamePhase: Phases = '1';
export const basedCharacters = ['Amber', 'Kaeya', 'Lisa'];
export const elementToColor: { [key in Elements]: string } = {
    Anemo: '58,152,150',
    Dendro: '106,170,32',
    Cryo: '52,170,203',
    Electro: '105,88,190',
    Pyro: '234,75,33',
    Geo: '202,143,72',
    Hydro: '80,145,205',
};
