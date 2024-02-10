import { Elements, Phases } from '@/lib/db/schema';
import { BalanceStats, BannerStats } from '@/lib/banners';
export const currentGameVersion: number = 4.1;
export const currentGamePhase: Phases = '1';
export const basedCharacters = ['Amber', 'Kaeya', 'Lisa'];
export const elementToColor: { [key in Elements]: string } = {
    Anemo: '58, 152, 150',
    Dendro: '106, 170, 32',
    Cryo: '52, 170, 203',
    Electro: '105, 88, 190',
    Pyro: '234, 75, 33',
    Geo: '202, 143, 72',
    Hydro: '80, 145, 205',
};
export const initialBannerStats: BannerStats = {
    CharacterEventWish: {
        fourStarCounter: 0,
        fiveStarCounter: 0,
        history: [],
        fourStarGuaranteed: false,
        fiveStarGuaranteed: false,
    },
    WeaponEventWish: {
        fourStarCounter: 0,
        fiveStarCounter: 0,
        history: [],
        fourStarGuaranteed: false,
        fiveStarGuaranteed: false,
    },
    NoviceWish: {
        fourStarCounter: 0,
        fiveStarCounter: 0,
        history: [],
    },
    StandardWish: {
        fourStarCounter: 0,
        fiveStarCounter: 0,
        history: [],
    },
};
export const initialBalance: BalanceStats = {
    'intertwined-fate': 0,
    'acquaint-fate': 20,
    primogems: 3200,
    'masterless-stardust': 0,
    'masterless-starglitter': 0,
    'genesis-crystal': 0,
};
