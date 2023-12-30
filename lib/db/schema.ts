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
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
export const raresEnum = pgEnum("rares", ["1", "2", "3", "4", "5"]);
export const phasesEnum = pgEnum("phases", ["1", "2"]);
export const elementsEnum = pgEnum("elements", [
  "Anemo",
  "Cryo",
  "Dendro",
  "Electro",
  "Geo",
  "Hydro",
  "Pyro",
]);
export const weaponTypesEnum = pgEnum("weapon_types", [
  "Bow",
  "Catalyst",
  "Claymore",
  "Polearm",
  "Sword",
]);
export const bannerTypesEnum = pgEnum("banner_types", [
  "Character Event Wish",
  "Character Event Wish-2",
  "Weapon Event Wish",
  "Novice Wish",
  "Standard Wish",
]);
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  rare: raresEnum("rare").notNull(),
  element: elementsEnum("element").notNull(),
  weaponType: weaponTypesEnum("weapon_type").notNull(),
  appearanceVersion: real("appearance_version").notNull(),
  inStandardWish: boolean("in_standard_wish"),
});
export const charactersRelations = relations(characters, ({ many }) => ({
  charactersBanners: many(characterBanners),
  standardBanners: many(standardBanners),
  featuredCharactersInBanners: many(featuredCharactersInBanners),
}));
export const weapons = pgTable("weapons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  rare: raresEnum("rare").notNull(),
  type: weaponTypesEnum("weapon_type").notNull(),
  appearanceVersion: real("appearance_version").notNull(),
  inStandardWish: boolean("in_standard_wish"),
});
export const weaponsRelations = relations(weapons, ({ many }) => ({
  firstMainWeaponInBanners: many(weaponBanners, {
    relationName: "first_main_weapon",
  }),
  secondMainWeaponInBanners: many(weaponBanners, {
    relationName: "second_main_weapon",
  }),
  featuredWeaponsInBanners: many(featuredWeaponsInBanners),
}));
export const characterBanners = pgTable("character_banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  mainCharacterId: integer("main_character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  version: real("version").notNull(),
  phase: phasesEnum("phase").notNull(),
  rerunNumber: integer("rerun_number"),
  type: bannerTypesEnum("banner_type").notNull(),
  textParameters: json("text_parameters")
    .$type<{ r: string; b: string }>()
    .notNull(),
});
export const characterBannersRelations = relations(
  characterBanners,
  ({ one }) => ({
    character: one(characters, {
      fields: [characterBanners.mainCharacterId],
      references: [characters.id],
    }),
  }),
);
export const featuredCharactersInBanners = pgTable(
  "featured_characters_in_banners",
  {
    bannerId: integer("banner_id")
      .notNull()
      .references(() => characterBanners.id, { onDelete: "cascade" }),
    characterId: integer("character_id")
      .notNull()
      .references(() => characters.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.bannerId, table.characterId] }),
    };
  },
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
  }),
);
export const weaponBanners = pgTable("weapon_banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  firstMainWeaponId: integer("first_main_weapon_id")
    .notNull()
    .references(() => weapons.id, { onDelete: "cascade" }),
  secondMainWeaponId: integer("second_main_weapon_id")
    .notNull()
    .references(() => weapons.id, { onDelete: "cascade" }),
  version: real("version").notNull(),
  phase: phasesEnum("phase").notNull(),
  type: bannerTypesEnum("banner_type").default("Weapon Event Wish").notNull(),
  textParameters: json("text_parameters")
    .$type<{
      fiveStar: { r: string; b: string; fontSize: string };
      [key: string]: { r: string; b: string; fontSize: string };
    }>()
    .notNull(),
});
export const weaponBannersRelations = relations(weaponBanners, ({ one }) => ({
  firstMainWeapon: one(weapons, {
    fields: [weaponBanners.firstMainWeaponId],
    references: [weapons.id],
    relationName: "first_main_weapon",
  }),
  secondMainWeapon: one(weapons, {
    fields: [weaponBanners.secondMainWeaponId],
    references: [weapons.id],
    relationName: "second_main_weapon",
  }),
}));
export const featuredWeaponsInBanners = pgTable(
  "featured_weapons_in_banners",
  {
    bannerId: integer("banner_id")
      .notNull()
      .references(() => weaponBanners.id, { onDelete: "cascade" }),
    weaponId: integer("weapon_id")
      .notNull()
      .references(() => weapons.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.bannerId, table.weaponId] }),
    };
  },
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
  }),
);
export const standardBanners = pgTable("standard_banners", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  mainCharacterId: integer("main_character_id")
    .notNull()
    .references(() => characters.id, { onDelete: "cascade" }),
  version: real("version").notNull(),
  previewVersion: real("preview_version").notNull(),
  type: bannerTypesEnum("banner_type").default("Standard Wish").notNull(),
  textParameters: json("text_parameters")
    .$type<{ [key: string]: { r: string; b: string; fontSize: string } }>()
    .notNull(),
});
export const standardBannersRelations = relations(
  standardBanners,
  ({ one }) => ({
    character: one(characters, {
      fields: [standardBanners.mainCharacterId],
      references: [characters.id],
    }),
  }),
);

export type CharacterBanner = typeof characterBanners.$inferSelect;
export type WeaponBanner = typeof weaponBanners.$inferSelect;
export type StandardBanner = typeof standardBanners.$inferSelect;

export type Character = typeof characters.$inferSelect;
export type Weapon = typeof weapons.$inferSelect;

export type BannerTypes = (typeof bannerTypesEnum.enumValues)[number];
export type Phases = (typeof phasesEnum.enumValues)[number];
export type Rares = (typeof raresEnum.enumValues)[number];
export type Elements = (typeof elementsEnum.enumValues)[number];
