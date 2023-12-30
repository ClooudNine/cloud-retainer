import {
    BannerTypes,
    Character,
    CharacterBanner,
    Rares,
    StandardBanner,
    Weapon,
    WeaponBanner,
} from '@/lib/db/schema';

export type Banners = CharacterBanner | WeaponBanner | StandardBanner;
export type BannerItems = (Character | Weapon)[];

export type WishHistoryTypes =
    | 'CharacterEventWish'
    | 'WeaponEventWish'
    | 'NoviceWish'
    | 'StandardWish';

export type WishHistory = {
    type: string;
    item: { name: string; rare: Rares };
    wishType: string;
    date: string;
}[];

export type BaseBannerStats = {
    fourStarCounter: 0;
    fiveStarCounter: 0;
    history: WishHistory;
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
