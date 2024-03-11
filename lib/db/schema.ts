import {
    boolean,
    integer,
    json,
    pgEnum,
    pgTable,
    primaryKey,
    real,
    serial,
    text,
    timestamp,
    unique,
    uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { AdapterAccount } from '@auth/core/adapters';
import * as z from 'zod';

export const raresEnum = pgEnum('rares', ['1', '2', '3', '4', '5']);
export const phasesEnum = pgEnum('phases', ['1', '2']);
export const elementsEnum = pgEnum('elements', [
    'Anemo',
    'Cryo',
    'Dendro',
    'Electro',
    'Geo',
    'Hydro',
    'Pyro',
]);

export const weaponTypesEnum = pgEnum('weapon_types', [
    'Bow',
    'Catalyst',
    'Claymore',
    'Polearm',
    'Sword',
]);

export const bannerTypesEnum = pgEnum('banner_types', [
    'Character Event Wish',
    'Character Event Wish-2',
    'Weapon Event Wish',
    'Novice Wish',
    'Standard Wish',
]);

export const userRolesEnum = pgEnum('user_roles', ['User', 'Admin']);

export const characters = pgTable('characters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    title: text('title').notNull(),
    rare: raresEnum('rare').notNull(),
    element: elementsEnum('element').notNull(),
    weaponType: weaponTypesEnum('weapon_type').notNull(),
    appearanceVersion: real('appearance_version').notNull(),
    inStandardWish: boolean('in_standard_wish'),
});

export const charactersRelations = relations(characters, ({ many }) => ({
    charactersBanners: many(characterBanners),
    standardBanners: many(standardBanners),
    featuredCharactersInBanners: many(featuredCharactersInBanners),
}));

export const weapons = pgTable('weapons', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    rare: raresEnum('rare').notNull(),
    type: weaponTypesEnum('weapon_type').notNull(),
    appearanceVersion: real('appearance_version').notNull(),
    inStandardWish: boolean('in_standard_wish'),
});

export const weaponsRelations = relations(weapons, ({ many }) => ({
    firstMainWeaponInBanners: many(weaponBanners, {
        relationName: 'first_main_weapon',
    }),
    secondMainWeaponInBanners: many(weaponBanners, {
        relationName: 'second_main_weapon',
    }),
    featuredWeaponsInBanners: many(featuredWeaponsInBanners),
}));

export const characterBanners = pgTable('character_banners', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    mainCharacterId: integer('main_character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }),
    version: real('version').notNull(),
    phase: phasesEnum('phase').notNull(),
    rerunNumber: integer('rerun_number').notNull(),
    type: bannerTypesEnum('banner_type').notNull(),
    textParameters: json('text_parameters').$type<{ r: string; b: string }>().notNull(),
});

export const characterBannersRelations = relations(characterBanners, ({ one, many }) => ({
    character: one(characters, {
        fields: [characterBanners.mainCharacterId],
        references: [characters.id],
    }),
    featuredCharactersInBanners: many(featuredCharactersInBanners),
}));

export const featuredCharactersInBanners = pgTable(
    'featured_characters_in_banners',
    {
        bannerId: integer('banner_id')
            .notNull()
            .references(() => characterBanners.id, { onDelete: 'cascade' }),
        characterId: integer('character_id')
            .notNull()
            .references(() => characters.id, { onDelete: 'cascade' }),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.bannerId, table.characterId] }),
        };
    }
);

export const featuredCharactersInBannersRelations = relations(
    featuredCharactersInBanners,
    ({ one }) => ({
        characterBanner: one(characterBanners, {
            fields: [featuredCharactersInBanners.bannerId],
            references: [characterBanners.id],
        }),
        character: one(characters, {
            fields: [featuredCharactersInBanners.characterId],
            references: [characters.id],
        }),
    })
);

export const weaponBanners = pgTable('weapon_banners', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    firstMainWeaponId: integer('first_main_weapon_id')
        .notNull()
        .references(() => weapons.id, { onDelete: 'cascade' }),
    secondMainWeaponId: integer('second_main_weapon_id')
        .notNull()
        .references(() => weapons.id, { onDelete: 'cascade' }),
    version: real('version').notNull(),
    phase: phasesEnum('phase').notNull(),
    type: bannerTypesEnum('banner_type').default('Weapon Event Wish').notNull(),
    textParameters: json('text_parameters')
        .$type<{
            fiveStar: { r: string; b: string; fontSize: string };
            [key: string]: { r: string; b: string; fontSize: string };
        }>()
        .notNull(),
});

export const weaponBannersRelations = relations(weaponBanners, ({ one, many }) => ({
    firstMainWeapon: one(weapons, {
        fields: [weaponBanners.firstMainWeaponId],
        references: [weapons.id],
        relationName: 'first_main_weapon',
    }),
    secondMainWeapon: one(weapons, {
        fields: [weaponBanners.secondMainWeaponId],
        references: [weapons.id],
        relationName: 'second_main_weapon',
    }),
    featuredWeaponsInBanners: many(featuredWeaponsInBanners),
}));

export const featuredWeaponsInBanners = pgTable(
    'featured_weapons_in_banners',
    {
        bannerId: integer('banner_id')
            .notNull()
            .references(() => weaponBanners.id, { onDelete: 'cascade' }),
        weaponId: integer('weapon_id')
            .notNull()
            .references(() => weapons.id, { onDelete: 'cascade' }),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.bannerId, table.weaponId] }),
        };
    }
);

export const featuredWeaponsInBannersRelations = relations(
    featuredWeaponsInBanners,
    ({ one }) => ({
        weaponBanner: one(weaponBanners, {
            fields: [featuredWeaponsInBanners.bannerId],
            references: [weaponBanners.id],
        }),
        weapon: one(weapons, {
            fields: [featuredWeaponsInBanners.weaponId],
            references: [weapons.id],
        }),
    })
);

export const standardBanners = pgTable('standard_banners', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    mainCharacterId: integer('main_character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }),
    version: real('version').notNull(),
    previewVersion: real('preview_version').notNull(),
    type: bannerTypesEnum('banner_type').default('Standard Wish').notNull(),
    textParameters: json('text_parameters')
        .$type<{ [key: string]: { r: string; b: string; fontSize: string } }>()
        .notNull(),
});

export const standardBannersRelations = relations(standardBanners, ({ one }) => ({
    character: one(characters, {
        fields: [standardBanners.mainCharacterId],
        references: [characters.id],
    }),
}));

export const users = pgTable('user', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    password: text('password'),
    role: userRolesEnum('role').default('User').notNull(),
});

export const accounts = pgTable(
    'account',
    {
        userId: uuid('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccount['type']>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const verificationToken = pgTable(
    'verification_token',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        email: text('email').notNull(),
        token: text('token').unique().notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => ({
        unq: unique().on(vt.email, vt.token),
    })
);

export const RegisterSchema = z.object({
    email: z.string().email({ message: 'Некорректный ввод Email' }),
    username: z.string().min(2, { message: 'Минимальная длина имени 2 символа' }),
    password: z.string().min(8, { message: 'Минимальная длина пароля 8 символов' }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Некорректный ввод Email' }),
    password: z.string().min(1, { message: 'Поле "Пароль" является обязательным' }),
});

export const CharacterBannersSchema = z.object({
    title: z.string().min(1, { message: 'Название не может быть пустым!' }),
    mainCharacterId: z.number().int().positive(),
    featuredCharactersId: z.array(z.number().positive()),
    version: z.number().positive(),
    phase: z.enum(phasesEnum.enumValues, {
        errorMap: () => ({ message: 'Ожидается значение 1 или 2!' }),
    }),
    rerunNumber: z.number().int().nonnegative(),
    type: z.enum(bannerTypesEnum.enumValues),
    image: z.instanceof(File).nullish(),
    textParameters: z.object({
        r: z.string(),
        b: z.string(),
    }),
});

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
export type Weapon = typeof weapons.$inferSelect;

export type BannerTypes = (typeof bannerTypesEnum.enumValues)[number];
export type WeaponType = (typeof weaponTypesEnum.enumValues)[number];
export type Phases = (typeof phasesEnum.enumValues)[number];
export type Rares = (typeof raresEnum.enumValues)[number];
export type Elements = (typeof elementsEnum.enumValues)[number];
export type UserRoles = (typeof userRolesEnum.enumValues)[number];
