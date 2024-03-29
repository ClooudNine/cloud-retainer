import { Currencies, PullCurrency, PurchasesCurrency } from '@/lib/banners';

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
