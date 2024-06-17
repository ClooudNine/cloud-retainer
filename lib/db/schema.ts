import {
    boolean,
    date,
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
import type { AdapterAccount } from 'next-auth/adapters';

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

export const weaponTypesEnum = pgEnum('weapon_types', ['Bow', 'Catalyst', 'Claymore', 'Polearm', 'Sword']);

export const bannerTypesEnum = pgEnum('banner_types', [
    'Character Event Wish',
    'Character Event Wish-2',
    'Weapon Event Wish',
    'Novice Wish',
    'Standard Wish',
]);

export const userRolesEnum = pgEnum('user_roles', ['User', 'Admin']);

export const talentTypesEnum = pgEnum('talent_types', [
    'Normal Attack',
    'Elemental Skill',
    'Elemental Burst',
    '1st Ascension Passive',
    '4th Ascension Passive',
    'Utility Passive',
]);

export const materialsTypesEnum = pgEnum('materials_types', [
    'Enhancement Material',
    'Local Specialty',
    'Ascension Material',
    'Talent Material',
    'Boss Drop',
]);

export const additionalWeaponCharacteristics = pgEnum('additional_weapon_characteristics', [
    'HP',
    'Physical Damage',
    'Energy recharge',
    'Defence',
    'Critical Damage',
    'Elemental Mastery',
    'Attack',
    'Critical Rate',
]);

export const characters = pgTable('characters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    rare: raresEnum('rare').notNull(),
    element: elementsEnum('element').notNull(),
    weaponType: weaponTypesEnum('weapon_type').notNull(),
    appearanceVersion: real('appearance_version')
        .notNull()
        .references(() => gameUpdates.version, {
            onDelete: 'cascade',
        }),
    description: text('description').notNull().default(''),
    constellation: text('constellation').notNull().default(''),
    baseAttack: integer('base_attack').notNull().default(0),
    baseHp: integer('base_hp').notNull().default(0),
    bossId: integer('boss_id')
        .notNull()
        .default(1)
        .references(() => bosses.id, { onDelete: 'cascade' }),
    talentMaterialId: integer('talent_material_id')
        .notNull()
        .default(1)
        .references(() => materials.id, {
            onDelete: 'cascade',
        }),
    localSpecialtyId: integer('local_specialty_id')
        .notNull()
        .default(1)
        .references(() => materials.id, {
            onDelete: 'cascade',
        }),
    enhancementMaterialId: integer('enhancement_material_id')
        .notNull()
        .default(1)
        .references(() => materials.id, {
            onDelete: 'cascade',
        }),
    inStandardWish: boolean('in_standard_wish'),
});

export const charactersRelations = relations(characters, ({ one, many }) => ({
    charactersBanners: many(characterBanners),
    standardBanners: many(standardBanners),
    featuredCharactersInBanners: many(featuredCharactersInBanners),
    talents: many(charactersTalents),
    constellations: many(charactersConstellations),
    weapons: many(charactersWeaponBuilds),
    artifacts: many(charactersArtifactsBuilds),
    appearanceVersion: one(gameUpdates, {
        fields: [characters.appearanceVersion],
        references: [gameUpdates.version],
    }),
    boss: one(bosses, {
        fields: [characters.bossId],
        references: [bosses.id],
    }),
    talentMaterial: one(materials, {
        fields: [characters.talentMaterialId],
        references: [materials.id],
        relationName: 'character_talent_material',
    }),
    localSpecialty: one(materials, {
        fields: [characters.localSpecialtyId],
        references: [materials.id],
        relationName: 'character_local_speciality',
    }),
    enhancementMaterial: one(materials, {
        fields: [characters.enhancementMaterialId],
        references: [materials.id],
        relationName: 'character_enhancement_material',
    }),
}));

export const weapons = pgTable('weapons', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    rare: raresEnum('rare').notNull(),
    type: weaponTypesEnum('weapon_type').notNull(),
    appearanceVersion: real('appearance_version')
        .notNull()
        .references(() => gameUpdates.version, {
            onDelete: 'cascade',
        }),
    baseAttack: integer('base_attack').notNull().default(0),
    additionalCharacteristic: additionalWeaponCharacteristics('additional_characteristic'),
    additionalCharacteristicStat: real('additional_characteristic_stat'),
    ability: text('ability').notNull().default(''),
    ascensionMaterialId: integer('ascension_material_id')
        .notNull()
        .default(1)
        .references(() => materials.id, { onDelete: 'cascade' }),
    firstEnhancementMaterialId: integer('first_enhancement_material_id')
        .notNull()
        .default(1)
        .references(() => materials.id, {
            onDelete: 'cascade',
        }),
    secondEnhancementMaterialId: integer('second_enhancement_material_id')
        .notNull()
        .default(1)
        .references(() => materials.id, {
            onDelete: 'cascade',
        }),
    inStandardWish: boolean('in_standard_wish'),
});

export const weaponsRelations = relations(weapons, ({ one, many }) => ({
    firstMainWeaponInBanners: many(weaponBanners, { relationName: 'first_main_weapon' }),
    secondMainWeaponInBanners: many(weaponBanners, { relationName: 'second_main_weapon' }),
    featuredWeaponsInBanners: many(featuredWeaponsInBanners),
    characters: many(charactersWeaponBuilds),
    appearanceVersion: one(gameUpdates, {
        fields: [weapons.appearanceVersion],
        references: [gameUpdates.version],
    }),
    ascensionMaterial: one(materials, {
        fields: [weapons.ascensionMaterialId],
        references: [materials.id],
        relationName: 'weapon_ascension_material',
    }),
    firstEnhancementMaterial: one(materials, {
        fields: [weapons.firstEnhancementMaterialId],
        references: [materials.id],
        relationName: 'weapon_first_enhancement_material',
    }),
    secondEnhancementMaterial: one(materials, {
        fields: [weapons.secondEnhancementMaterialId],
        references: [materials.id],
        relationName: 'weapon_second_enhancement_material',
    }),
}));

export const characterBanners = pgTable('character_banners', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    mainCharacterId: integer('main_character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }),
    version: real('version')
        .notNull()
        .references(() => gameUpdates.version, {
            onDelete: 'cascade',
        }),
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
    version: one(gameUpdates, {
        fields: [characterBanners.version],
        references: [gameUpdates.version],
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

export const featuredCharactersInBannersRelations = relations(featuredCharactersInBanners, ({ one }) => ({
    characterBanner: one(characterBanners, {
        fields: [featuredCharactersInBanners.bannerId],
        references: [characterBanners.id],
    }),
    character: one(characters, {
        fields: [featuredCharactersInBanners.characterId],
        references: [characters.id],
    }),
}));

export const weaponBanners = pgTable('weapon_banners', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    firstMainWeaponId: integer('first_main_weapon_id')
        .notNull()
        .references(() => weapons.id, { onDelete: 'cascade' }),
    secondMainWeaponId: integer('second_main_weapon_id')
        .notNull()
        .references(() => weapons.id, { onDelete: 'cascade' }),
    version: real('version')
        .notNull()
        .references(() => gameUpdates.version, {
            onDelete: 'cascade',
        }),
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
    version: one(gameUpdates, {
        fields: [weaponBanners.version],
        references: [gameUpdates.version],
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

export const featuredWeaponsInBannersRelations = relations(featuredWeaponsInBanners, ({ one }) => ({
    weaponBanner: one(weaponBanners, {
        fields: [featuredWeaponsInBanners.bannerId],
        references: [weaponBanners.id],
    }),
    weapon: one(weapons, {
        fields: [featuredWeaponsInBanners.weaponId],
        references: [weapons.id],
    }),
}));

export const standardBanners = pgTable('standard_banners', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    mainCharacterId: integer('main_character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }),
    version: real('version')
        .notNull()
        .references(() => gameUpdates.version, {
            onDelete: 'cascade',
        }),
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
    version: one(gameUpdates, {
        fields: [standardBanners.version],
        references: [gameUpdates.version],
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

export const usersRelations = relations(users, ({ many }) => ({
    achievements: many(userAchievements),
    events: many(userEvents),
}));

export const account = pgTable(
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

export const bosses = pgTable('bosses', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().default(''),
    dropId: integer('dropId')
        .notNull()
        .default(1)
        .references(() => materials.id, {
            onDelete: 'cascade',
        }),
});

export const bossesRelations = relations(bosses, ({ many, one }) => ({
    drop: one(materials, {
        fields: [bosses.dropId],
        references: [materials.id],
    }),
    characters: many(characters),
}));

export const materials = pgTable('materials', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().default(''),
    type: materialsTypesEnum('type'),
});

export const materialsRelations = relations(materials, ({ many }) => ({
    characterTalentMaterial: many(characters, { relationName: 'character_talent_material' }),
    characterLocalSpecialty: many(characters, { relationName: 'character_local_speciality' }),
    characterEnhancementMaterial: many(characters, { relationName: 'character_enhancement_material' }),
    weaponAscensionMaterial: many(weapons, { relationName: 'weapon_ascension_material' }),
    weaponFirstEnhancementMaterial: many(weapons, { relationName: 'weapon_first_enhancement_material' }),
    weaponSecondEnhancementMaterial: many(weapons, { relationName: 'weapon_second_enhancement_material' }),
    bosses: many(bosses),
}));

export const charactersTalents = pgTable('characters_talents', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }),
    title: text('title').notNull().default(''),
    type: talentTypesEnum('type').notNull(),
    description: text('description').notNull().default(''),
    priority: integer('priority').default(1),
});

export const charactersTalentsRelations = relations(charactersTalents, ({ one }) => ({
    character: one(characters, {
        fields: [charactersTalents.characterId],
        references: [characters.id],
    }),
}));

export const charactersConstellations = pgTable('characters_constellations', {
    id: serial('id').primaryKey(),
    characterId: integer('character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }),
    title: text('title').notNull().default(''),
    level: integer('level').notNull().default(1),
    description: text('description').notNull().default(''),
});

export const charactersConstellationsRelations = relations(charactersConstellations, ({ one }) => ({
    character: one(characters, {
        fields: [charactersConstellations.characterId],
        references: [characters.id],
    }),
}));

export const charactersWeaponBuilds = pgTable(
    'characters_weapon_builds',
    {
        characterId: integer('character_id')
            .notNull()
            .references(() => characters.id, { onDelete: 'cascade' }),
        weaponId: integer('weapon_id')
            .notNull()
            .references(() => weapons.id, { onDelete: 'cascade' }),
        rating: integer('rating').notNull().default(1),
    },
    (cwb) => {
        return {
            pk: primaryKey({ columns: [cwb.characterId, cwb.weaponId] }),
        };
    }
);

export const charactersWeaponBuildsRelations = relations(charactersWeaponBuilds, ({ one }) => ({
    character: one(characters, {
        fields: [charactersWeaponBuilds.characterId],
        references: [characters.id],
    }),
    weapon: one(weapons, {
        fields: [charactersWeaponBuilds.weaponId],
        references: [weapons.id],
    }),
}));

export const artifactsSet = pgTable('artifacts_set', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    twoArtifactsBonus: text('two_artifacts_bonus').notNull(),
    fourArtifactsBonus: text('four_artifacts_bonus').notNull(),
});

export const artifactsSetRelations = relations(artifactsSet, ({ many }) => ({
    firstSetForCharacters: many(charactersArtifactsBuilds, { relationName: 'first_set_for_characters' }),
    secondSetForCharacters: many(charactersArtifactsBuilds, { relationName: 'second_set_for_characters' }),
}));

export const charactersArtifactsBuilds = pgTable(
    'characters_artifacts_builds',
    {
        characterId: integer('character_id')
            .notNull()
            .references(() => characters.id, { onDelete: 'cascade' }),
        firstArtifactSetId: integer('first_artifact_set_id')
            .notNull()
            .references(() => artifactsSet.id, { onDelete: 'cascade' }),
        secondArtifactSetId: integer('second_artifact_set_id')
            .notNull()
            .references(() => artifactsSet.id, {
                onDelete: 'cascade',
            }),
        rating: integer('rating').notNull().default(1),
    },
    (cab) => {
        return {
            pk: primaryKey({ columns: [cab.characterId, cab.firstArtifactSetId, cab.secondArtifactSetId] }),
        };
    }
);

export const charactersArtifactsBuildsRelations = relations(charactersArtifactsBuilds, ({ one }) => ({
    character: one(characters, {
        fields: [charactersArtifactsBuilds.characterId],
        references: [characters.id],
    }),
    firstArtifactSet: one(artifactsSet, {
        fields: [charactersArtifactsBuilds.firstArtifactSetId],
        references: [artifactsSet.id],
        relationName: 'first_set_for_characters',
    }),
    secondArtifactSet: one(artifactsSet, {
        fields: [charactersArtifactsBuilds.secondArtifactSetId],
        references: [artifactsSet.id],
        relationName: 'second_set_for_characters',
    }),
}));

export const gameUpdates = pgTable('game_updates', {
    version: real('version').primaryKey(),
    date: date('date', { mode: 'date' }).notNull(),
});

export const achievementsChapters = pgTable('achievements_chapters', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
});

export const achievementsChaptersRelations = relations(achievementsChapters, ({ many }) => ({
    achievements: many(achievements),
}));

export const achievements = pgTable('achievements', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    chapter: integer('chapter')
        .notNull()
        .references(() => achievementsChapters.id, { onDelete: 'cascade' }),
    description: text('description').notNull(),
    reward: integer('reward').notNull(),
    hidden: boolean('hidden'),
    requirements: text('requirements'),
});

export const achievementsRelations = relations(achievements, ({ one, many }) => ({
    chapter: one(achievementsChapters, {
        fields: [achievements.chapter],
        references: [achievementsChapters.id],
    }),
    users: many(userAchievements),
}));

export const userAchievements = pgTable(
    'user_achievements',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        achievementId: integer('achievement_id')
            .notNull()
            .references(() => achievements.id, { onDelete: 'cascade' }),
        achievedAt: date('achieved_at', { mode: 'date' }).notNull().defaultNow(),
    },
    (ua) => {
        return {
            pk: primaryKey({ columns: [ua.userId, ua.achievementId] }),
        };
    }
);

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
    user: one(users, {
        fields: [userAchievements.userId],
        references: [users.id],
    }),
    achievement: one(achievements, {
        fields: [userAchievements.achievementId],
        references: [achievements.id],
    }),
}));

export const events = pgTable('events', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    startDate: date('start_date', { mode: 'date' }).notNull(),
    endDate: date('end_date', { mode: 'date' }).notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
    users: many(userEvents),
}));

export const promocodes = pgTable('promocodes', {
    id: serial('id').primaryKey(),
    value: text('value').notNull(),
    rewards: text('rewards').notNull(),
    startDate: date('start_date', { mode: 'date' }).notNull(),
});

export const userEvents = pgTable(
    'user_events',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        eventId: integer('event_id')
            .notNull()
            .references(() => events.id, { onDelete: 'cascade' }),
    },
    (ua) => {
        return {
            pk: primaryKey({ columns: [ua.userId, ua.eventId] }),
        };
    }
);

export const userEventsRelations = relations(userEvents, ({ one }) => ({
    user: one(users, {
        fields: [userEvents.userId],
        references: [users.id],
    }),
    event: one(events, {
        fields: [userEvents.eventId],
        references: [events.id],
    }),
}));

export const news = pgTable('news', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    publishDate: date('publish_date', { mode: 'date' }).notNull(),
    content: text('content').notNull(),
});
