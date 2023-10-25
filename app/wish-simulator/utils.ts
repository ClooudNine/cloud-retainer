import { bannerOrder, BannerPhases, Banners } from '@/app/types/banner';
import { Versions } from '@/app/types/common';
import { Character } from '@/app/types/character';
import { Weapon } from '@/app/types/weapon';
import { SupabaseClient } from '@supabase/supabase-js';
import striptags from 'striptags';

const getNearestVersion = (availableVersions: Versions[], currentGameVersion: Versions) => {
	return availableVersions.reduce((prev, curr) => {
		return Math.abs(curr - currentGameVersion) < Math.abs(prev - currentGameVersion) ? curr : prev;
	});
};
const getCharacterPortraitUrl = (supabase: SupabaseClient, characters: Character[], characterId: number) => {
	const character = characters.find(character => character.id === characterId);
	if (character) {
		return supabase.storage.from('character portraits').getPublicUrl(`${character.name}.png`).data.publicUrl;
	}
	return '';
};
const getWeaponPortraitUrl = (supabase: SupabaseClient, weapons: Weapon[], weaponId: number) => {
	const weapon = weapons.find(weapon => weapon.id === weaponId);
	if (weapon) {
		return supabase.storage.from('weapons portraits').getPublicUrl(`${weapon.title}.png`).data.publicUrl;
	}
	return '';
};
export const getBannersSet = (banners: Banners[], version: Versions, phase: BannerPhases): Banners[] => {
	const standardBanners = banners.filter(banner => banner.type === 'Standard Wish');
	const standardBannerVersions = standardBanners.map(standardBanner => standardBanner.version);
	const standardBannerVersion = getNearestVersion(standardBannerVersions, version);
	const bannersByVersion = banners.filter(banner => {
		if (banner.type === 'Standard Wish') {
			return banner.version === standardBannerVersion;
		} else {
			return banner.version === version && banner.phase === phase;
		}
	});
	return bannersByVersion.sort((firstBanner, secondBanner) => bannerOrder[firstBanner.type] - bannerOrder[secondBanner.type]);
};
export const getButtonsPortraitsUrl = (
	supabase: SupabaseClient,
	currentBanners: Banners[],
	characters: Character[],
	weapons: Weapon[]
): string[][] => {
	return currentBanners.map(banner => {
		if (banner.type === 'Weapon Event Wish') {
			const mainWeaponsId = [banner.first_main_weapon, banner.second_main_weapon];
			return mainWeaponsId.map(weaponId => getWeaponPortraitUrl(supabase, weapons, weaponId));
		} else {
			return [getCharacterPortraitUrl(supabase, characters, banner.main_character)];
		}
	});
};
export const getPreviewsUrlForCurrentBanners = (supabase: SupabaseClient, currentBanners: Banners[]): string[] => {
	return currentBanners.map(banner => {
		const bannerTitle = striptags(banner.title);
		switch (banner.type) {
			case 'Character Event Wish':
			case 'Character Event Wish-2':
				return supabase.storage.from('wish banners').getPublicUrl(`${bannerTitle} ${banner.rerun_number}.png`).data.publicUrl;
			case 'Weapon Event Wish':
				return supabase.storage.from('wish banners').getPublicUrl(`${bannerTitle} ${banner.date}.png`).data.publicUrl;
			case 'Standard Wish':
				return supabase.storage.from('wish banners').getPublicUrl(`${bannerTitle} ${banner.preview_version}.png`).data.publicUrl;
			case 'Novice Wish':
				return supabase.storage.from('wish banners').getPublicUrl(`${bannerTitle}.png`).data.publicUrl;
		}
	});
};
