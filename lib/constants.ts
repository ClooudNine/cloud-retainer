import { BalanceStats, BannerStats, BannerTypes, Elements, Phases, PurchasesCurrency } from '@/lib/types';

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
    primogem: 3200,
    'masterless-stardust': 0,
    'masterless-starglitter': 0,
    'genesis-crystal': 0,
};

export const bannerOrder: { [key in BannerTypes]: number } = {
    'Novice Wish': 1,
    'Character Event Wish': 2,
    'Character Event Wish-2': 3,
    'Weapon Event Wish': 4,
    'Standard Wish': 5,
};

export const bannerHistoryTypes: { [key: string]: string } = {
    StandardWish: 'Стандартная молитва',
    NoviceWish: 'Молитва новичка',
    CharacterEventWish: 'Молитва события персонажа и Молитва события персонажа II',
    WeaponEventWish: 'Молитва события оружия',
};

export const bannerTranslates: { [key in BannerTypes]: string } = {
    'Novice Wish': 'Молитва новичка',
    'Character Event Wish': 'Молитва события персонажа',
    'Character Event Wish-2': 'Молитва события персонажа II',
    'Weapon Event Wish': 'Молитва события оружия',
    'Standard Wish': 'Стандартная молитва',
};

export const purchasesCurrencies: PurchasesCurrency[] = [
    'masterless-starglitter',
    'masterless-stardust',
    'primogem',
];

export const priceOfFate: { [key in PurchasesCurrency]: number } = {
    'masterless-starglitter': 5,
    'masterless-stardust': 75,
    primogem: 160,
};
