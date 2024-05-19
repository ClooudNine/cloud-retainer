import {
    artifactsSet,
    bannerTypesEnum,
    characterBanners,
    characters,
    charactersConstellations,
    charactersTalents,
    elementsEnum,
    phasesEnum,
    raresEnum,
    standardBanners,
    userRolesEnum,
    weaponBanners,
    weapons,
    weaponTypesEnum,
} from '@/lib/db/schema';
import React from 'react';

export type CharacterBanner = typeof characterBanners.$inferSelect & {
    character: Character;
    featuredCharactersInBanners: { character: Character }[];
};

export type WeaponBanner = typeof weaponBanners.$inferSelect & {
    firstMainWeapon: Weapon;
    secondMainWeapon: Weapon;
    featuredWeaponsInBanners: { weapon: Weapon }[];
};

export type StandardBanner = typeof standardBanners.$inferSelect & {
    character: Character;
};

export type Character = typeof characters.$inferSelect;
export type CharacterTalent = typeof charactersTalents.$inferSelect;
export type CharacterConstellation = typeof charactersConstellations.$inferSelect;

export type ArtifactSet = typeof artifactsSet.$inferSelect;

export type Weapon = typeof weapons.$inferSelect;

export type BannerTypes = (typeof bannerTypesEnum.enumValues)[number];

export type WeaponType = (typeof weaponTypesEnum.enumValues)[number];

export type Phases = (typeof phasesEnum.enumValues)[number];

export type Rares = (typeof raresEnum.enumValues)[number];

export type Elements = (typeof elementsEnum.enumValues)[number];

export type UserRoles = (typeof userRolesEnum.enumValues)[number];

export type Banners = CharacterBanner | WeaponBanner | StandardBanner;

export type BannerItems = (Character | Weapon)[];

export type WishHistoryTypes = 'CharacterEventWish' | 'WeaponEventWish' | 'NoviceWish' | 'StandardWish';

export type WishHistory = {
    type: string;
    item: { name: string; rare: Rares };
    wishType: string;
    date: string;
}[];

export type EpitomizedStats = { weaponId: number; count: number };

export type EpitomizedPath = { [key: number]: EpitomizedStats };

export type BaseBannerStats = {
    fourStarCounter: number;
    fiveStarCounter: number;
    history: WishHistory;
};

export type BaseBannerStatsWithGuaranteed = BaseBannerStats & {
    fourStarGuaranteed: boolean;
    fiveStarGuaranteed: boolean;
};

export type BannerStats = {
    [key in WishHistoryTypes]: key extends 'CharacterEventWish' | 'WeaponEventWish'
        ? BaseBannerStatsWithGuaranteed
        : BaseBannerStats;
};

export type PullCurrency = 'intertwined-fate' | 'acquaint-fate';

export type PurchasesCurrency = 'primogems' | 'masterless-stardust' | 'masterless-starglitter';

export type Currencies = PullCurrency | PurchasesCurrency | 'genesis-crystal';

export type BalanceStats = { [key in Currencies]: number };

export type Links = { title: string; link: string; icon: React.JSX.Element }[];
