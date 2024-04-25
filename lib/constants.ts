import {
    BalanceStats,
    BannerStats,
    BannerTypes,
    Currencies,
    Elements,
    Phases,
    PullCurrency,
    PurchasesCurrency,
} from '@/lib/types';

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

export const bannerOrder: { [key in BannerTypes]: number } = {
    'Novice Wish': 1,
    'Character Event Wish': 2,
    'Character Event Wish-2': 3,
    'Weapon Event Wish': 4,
    'Standard Wish': 5,
};

export const bannerDescriptions: { [key in BannerTypes]: string } = {
    'Novice Wish': '"As a dutiful main would."',
    'Character Event Wish':
        '5-star event-exclusive characters can only be obtained in the specified wish during the specified time period(s). View Details for more.',
    'Character Event Wish-2':
        '5-star event-exclusive characters can only be obtained in the specified wish during the specified time period(s). View Details for more.',
    'Weapon Event Wish': 'View Details for more.',
    'Standard Wish': 'Standard wishes have no time limit. View Details for more.',
};

export const bannerSecondTitle: { [key in BannerTypes]: string } = {
    'Novice Wish': '10-set 20% off. First 10-set will receive Noelle',
    'Character Event Wish': 'Probability increased!',
    'Character Event Wish-2': 'Probability increased!',
    'Weapon Event Wish': 'Probability increased!',
    'Standard Wish': 'Standard Wish',
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

export const purchasesCurrencies: { [key in PurchasesCurrency]: string } = {
    'masterless-starglitter': 'Звёздный блеск',
    'masterless-stardust': 'Звёздная пыль',
    primogems: 'Камни Истока',
};

export const priceOfFate: { [key in PurchasesCurrency]: number } = {
    'masterless-starglitter': 5,
    'masterless-stardust': 75,
    primogems: 160,
};

export const pullCurrencyDescriptions: {
    [key in PullCurrency]: { translate: string; description: string };
} = {
    'intertwined-fate': {
        translate: 'Переплетающиеся судьбы',
        description:
            'Судьбоносный камень, который соединяет мечты. Его блёклое свечение переплетает судьбы и соединяет мечты так же, как звёзды соединяются в созвездия.',
    },
    'acquaint-fate': {
        translate: 'Судьбоносные встречи',
        description:
            'Семена надежды, освещающие ночное небо. Несмотря на расстояние, те кому суждено встретится, обязательно найдут друг друга под звёздами',
    },
};

export const currenciesTranslate: { [key in Currencies]: string } = {
    'intertwined-fate': 'Переплетающиеся судьбы',
    'acquaint-fate': 'Судьбоносные встречи',
    primogems: 'Примогемы',
    'masterless-stardust': 'Звёздная пыль',
    'masterless-starglitter': 'Звёздный блеск',
    'genesis-crystal': 'Кристалл Сотворения',
};
