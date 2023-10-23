import {
	bannerOrder,
	BannerPhases,
	CharacterBanner,
	standardBannerParametersByVersion,
	WeaponBanner
} from '@/app/types/banner';
import { currentGameVersion, Versions } from '@/app/types/common';
import { Character } from '@/app/types/character';
import { Weapon } from '@/app/types/weapon';
import { SupabaseClient } from '@supabase/supabase-js';
import striptags from 'striptags';

const getNearestVersion = (
	availableVersions: Versions[],
	currentGameVersion: Versions
) => {
	return availableVersions.reduce((prev, curr) => {
		return Math.abs(curr - currentGameVersion) <
			Math.abs(prev - currentGameVersion)
			? curr
			: prev;
	});
};
export const getStandardBannerParameters = (currentGameVersion: Versions) => {
	const availableVersions = Object.keys(standardBannerParametersByVersion).map(
		parseFloat
	) as Versions[];
	const nearestVersion = getNearestVersion(
		availableVersions,
		currentGameVersion
	);
	return standardBannerParametersByVersion[nearestVersion];
};
const getCharacterPortraitUrl = (
	supabase: SupabaseClient,
	characters: Character[],
	characterId: number
) => {
	const character = characters.find(character => character.id === characterId);
	if (character) {
		return supabase.storage
			.from('character portraits')
			.getPublicUrl(`${character.name}.png`).data.publicUrl;
	}
	return '';
};
const getWeaponPortraitUrl = (
	supabase: SupabaseClient,
	weapons: Weapon[],
	weaponId: number
) => {
	const weapon = weapons.find(weapon => weapon.id === weaponId);
	if (weapon) {
		return supabase.storage
			.from('weapons portraits')
			.getPublicUrl(`${weapon.title}.png`).data.publicUrl;
	}
	return '';
};
export const getBannerColorPalette = (
	banner: CharacterBanner | WeaponBanner
): string => {
	if (banner.type !== 'Standard Wish') {
		return banner.color_palette;
	} else {
		const colorPalettes = JSON.parse(banner.color_palette);
		const availableVersions = Object.keys(colorPalettes).map(
			parseFloat
		) as Versions[];
		const nearestVersion = getNearestVersion(
			availableVersions,
			currentGameVersion
		);
		return colorPalettes[nearestVersion];
	}
};
export const getBannersSet = (
	banners: (CharacterBanner | WeaponBanner)[],
	version: Versions,
	phase: BannerPhases
): (CharacterBanner | WeaponBanner)[] => {
	const bannersByVersion = banners.filter(
		banner =>
			(banner.version === version && banner.phase === phase) ||
			banner.type === 'Standard Wish'
	);
	return bannersByVersion.sort(
		(firstBanner, secondBanner) =>
			bannerOrder[firstBanner.type] - bannerOrder[secondBanner.type]
	);
};
export const getButtonsPortraitsUrl = (
	supabase: SupabaseClient,
	currentBanners: (CharacterBanner | WeaponBanner)[],
	characters: Character[],
	weapons: Weapon[]
): string[][] => {
	return currentBanners.map(banner => {
		switch (banner.type) {
			case 'Character Event Wish':
			case 'Character Event Wish-2':
			case 'Novice Wish':
				return [
					getCharacterPortraitUrl(supabase, characters, banner.main_character)
				];
			case 'Weapon Event Wish':
				const mainWeaponsId = [
					banner.first_main_weapon,
					banner.second_main_weapon
				];
				return mainWeaponsId.map(weaponId =>
					getWeaponPortraitUrl(supabase, weapons, weaponId)
				);
			case 'Standard Wish':
				const currentStandardBannerParameters =
					getStandardBannerParameters(currentGameVersion);
				return [
					supabase.storage
						.from('character portraits')
						.getPublicUrl(
							`${currentStandardBannerParameters?.character_on_button}.png`
						).data.publicUrl
				];
		}
	});
};
export const getPreviewsUrlForCurrentBanners = (
	supabase: SupabaseClient,
	currentBanners: (CharacterBanner | WeaponBanner)[]
): string[] => {
	return currentBanners.map(banner => {
		const bannerTitle = striptags(banner.title);
		switch (banner.type) {
			case 'Character Event Wish':
			case 'Character Event Wish-2':
				return supabase.storage
					.from('wish banners')
					.getPublicUrl(`${bannerTitle} ${banner.rerun_number}.png`).data
					.publicUrl;
			case 'Weapon Event Wish':
				return supabase.storage
					.from('wish banners')
					.getPublicUrl(`${bannerTitle} ${banner.date}.png`).data.publicUrl;
			case 'Standard Wish':
				return supabase.storage
					.from('wish banners')
					.getPublicUrl(
						`${bannerTitle} ${getStandardBannerParameters(currentGameVersion)
							?.preview_version}.png`
					).data.publicUrl;
			case 'Novice Wish':
				return supabase.storage
					.from('wish banners')
					.getPublicUrl(`${bannerTitle}.png`).data.publicUrl;
		}
	});
};
