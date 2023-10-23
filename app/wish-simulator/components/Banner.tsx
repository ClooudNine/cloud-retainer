'use client';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { Character } from '@/app/types/character';
import { Weapon } from '@/app/types/weapon';
import star from '@/public/wish-simulator/star-for-description.png';
import {
	bannerDescriptions,
	bannerSecondTitle,
	CharacterBanner,
	NamesOffsets,
	StandardBannerParameters,
	TextParameters,
	WeaponBanner
} from '@/app/types/banner';
import SwitchBannerArrow from '@/app/wish-simulator/components/SwitchBannerArrow';
import classNames from 'classnames';
import { currentGameVersion } from '@/app/types/common';
import {
	getBannerColorPalette,
	getStandardBannerParameters
} from '@/app/wish-simulator/utils';

const renderCharacterBannerInfo = (
	character: Character,
	offsets: TextParameters
) => {
	return (
		<div
			style={
				{
					'--right-offset': offsets['r'],
					'--bottom-offset': offsets['b']
				} as CSSProperties
			}
			className={
				'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'
			}
		>
			<p
				className={
					'font-genshin text-[4cqw] text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
				}
			>
				{character.name}
			</p>
			<p className={'font-genshin text-[1.8cqw] mt-[3cqw] text-[#c2bd96]'}>
				{character.title}
			</p>
		</div>
	);
};
const renderWeaponBannerInfo = (weapons: Weapon[], offset: TextParameters) => {
	return (
		<div
			style={
				{
					'--right-offset': offset['r'],
					'--bottom-offset': offset['b']
				} as CSSProperties
			}
			className={
				'absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]'
			}
		>
			{weapons.map(weapon => (
				<p
					key={weapon.title}
					className={
						'font-genshin text-[3cqw] text-white leading-tight drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
					}
				>
					{weapon.title}
				</p>
			))}
		</div>
	);
};
const renderStandardBannerInfo = (
	titlesOnBanner: string[],
	characters: Character[],
	standardBannerParameters: {
		[p: string]: TextParameters;
	}
) => {
	return (
		<>
			{titlesOnBanner.map(title => {
				const maybeCharacter = characters.find(
					character => character.name === title
				);
				return (
					<div
						key={title}
						style={
							{
								'--right-offset': standardBannerParameters[title]['r'],
								'--bottom-offset': standardBannerParameters[title]['b'],
								'--name-size': standardBannerParameters[title]['fontSize']
							} as CSSProperties
						}
						className={`absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]`}
					>
						{maybeCharacter ? (
							<>
								<pre
									className={
										'font-genshin text-[length:var(--name-size)] leading-tight text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
									}
								>
									{maybeCharacter.name}
								</pre>
								<p
									className={
										'font-genshin text-[1.5cqw] mt-[2cqw] text-[#c2bd96]'
									}
								>
									{maybeCharacter.title}
								</p>
							</>
						) : (
							<pre
								className={
									'font-genshin text-[length:var(--name-size)] leading-tight text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
								}
							>
								{title}
							</pre>
						)}
					</div>
				);
			})}
		</>
	);
};
const getMainItemsNamesAndTitles = (
	characters: Character[],
	weapons: Weapon[],
	selectedBanner: CharacterBanner | WeaponBanner
) => {
	switch (selectedBanner.type) {
		case 'Character Event Wish':
		case 'Character Event Wish-2':
		case 'Novice Wish':
			const mainCharacter = characters.find(
				character => character.id === selectedBanner.main_character
			) as Character;
			const characterNameOffset =
				selectedBanner.text_parameters as TextParameters;
			return renderCharacterBannerInfo(mainCharacter, characterNameOffset);
		case 'Weapon Event Wish':
			const mainWeaponsId = [
				selectedBanner.first_main_weapon,
				selectedBanner.second_main_weapon
			];
			const mainWeapons = mainWeaponsId.map(
				weaponId => weapons.find(weapon => weapon.id === weaponId) as Weapon
			);
			const weaponsTitlesOffset = selectedBanner.name_offsets as TextParameters;
			return renderWeaponBannerInfo(mainWeapons, weaponsTitlesOffset);
		case 'Standard Wish':
			const currentStandardBannerTextParameters = (
				getStandardBannerParameters(
					currentGameVersion
				) as StandardBannerParameters
			).text_parameters;
			const standardBannerOffsets = (
				selectedBanner.text_parameters as NamesOffsets
			)[currentStandardBannerTextParameters];
			const titlesOnBanner = Object.keys(standardBannerOffsets);
			return renderStandardBannerInfo(
				titlesOnBanner,
				characters,
				standardBannerOffsets
			);
	}
};
const Banner = () => {
	const {
		characters,
		weapons,
		selectedBanner,
		selectedBannerPreviewUrl,
		isAnimate
	} = useBannerContext();
	const bannerContainerClasses = classNames(
		'relative w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] transition-all',
		{
			'duration-0 opacity-0 translate-x-10': isAnimate,
			'duration-700': !isAnimate
		}
	);
	const bannerTypeClasses = classNames(
		'absolute text-[2cqw] -left-1 -top-1 font-genshin text-white bg-[var(--palette-no-opacity)] rounded-l-full rounded-br-[19999px] pl-3 pr-5 py-0.5',
		{
			'top-[8%]':
				selectedBanner.type === 'Standard Wish' &&
				getStandardBannerParameters(currentGameVersion)?.top_offset,
			'-top-1':
				selectedBanner.type !== 'Standard Wish' ||
				(selectedBanner.type === 'Standard Wish' &&
					!getStandardBannerParameters(currentGameVersion)?.top_offset)
		}
	);
	const bannerTitleClasses = classNames(
		'absolute drop-shadow-[0_0_2px_rgba(255,255,255,1)] text-[#595957] text-[5cqw] leading-tight font-genshin left-[5%] [&_em]:text-[var(--palette-no-opacity)] [&_em]:not-italic',
		{
			'top-[15%]':
				selectedBanner.type === 'Standard Wish' &&
				getStandardBannerParameters(currentGameVersion)?.top_offset,
			'top-[8%]':
				selectedBanner.type !== 'Standard Wish' ||
				(selectedBanner.type === 'Standard Wish' &&
					!getStandardBannerParameters(currentGameVersion)?.top_offset)
		}
	);
	const bannerDescriptionClasses = classNames(
		'absolute overflow-y-scroll w-1/2 pl-[5%] h-2/5 scrollbar-for-banner sm:w-[40%]',
		{
			'bottom-[16%]':
				selectedBanner.type === 'Standard Wish' &&
				getStandardBannerParameters(currentGameVersion)?.top_offset,
			'bottom-[23%]':
				selectedBanner.type !== 'Standard Wish' ||
				(selectedBanner.type === 'Standard Wish' &&
					!getStandardBannerParameters(currentGameVersion)?.top_offset)
		}
	);

	const rulesClasses = classNames(
		'flex items-center gap-1 mt-1 h-min md:mt-2',
		{
			'bg-[var(--palette-opacity)]': currentGameVersion !== 1,
			'bg-[rgba(65,163,162,0.8)]':
				currentGameVersion === 1 && selectedBanner.type === 'Standard Wish',
			'bg-[rgba(230,98,106,255)]': selectedBanner.type === 'Novice Wish'
		}
	);
	return (
		<section
			className={'flex items-center justify-center sm:justify-between z-10'}
		>
			<SwitchBannerArrow isForward={false} />
			<div
				className={bannerContainerClasses}
				style={
					{
						'--palette-opacity': `rgba(${getBannerColorPalette(
							selectedBanner
						)}, 0.8)`,
						'--palette-no-opacity': `rgba(${getBannerColorPalette(
							selectedBanner
						)}, 1)`,
						containerType: 'inline-size'
					} as CSSProperties
				}
			>
				<Image
					src={selectedBannerPreviewUrl}
					alt={'Картинка баннера'}
					draggable={false}
					width={1200}
					height={600}
					quality={100}
					className={'rounded-2xl w-full h-auto select-none'}
				/>
				<div className={bannerTypeClasses}>{selectedBanner.type}</div>
				<p
					className={bannerTitleClasses}
					dangerouslySetInnerHTML={{ __html: selectedBanner.title }}
				></p>
				<div dir={'rtl'} className={bannerDescriptionClasses}>
					<p
						dir={'ltr'}
						className={'text-[#595957] text-[2.5cqw] font-genshin'}
					>
						{bannerSecondTitle[selectedBanner.type]}
					</p>
					<div dir={'ltr'} className={rulesClasses}>
						<Image
							src={star}
							quality={100}
							width={32}
							alt={'Звезда'}
							className={'w-5 h-auto pl-1'}
						/>
						<p className={'font-genshin text-white text-[1.8cqw]'}>
							Every 10 wishes is guaranteed to include at least one 4-star or
							higher item.
						</p>
					</div>
					<p
						dir={'ltr'}
						className={
							'font-genshin mt-1 text-[#595957] text-[1.7cqw] drop-shadow-[0_0_2px_rgba(255,255,255,1)] md:mt-2'
						}
					>
						{bannerDescriptions[selectedBanner.type]}
					</p>
				</div>
				{getMainItemsNamesAndTitles(characters, weapons, selectedBanner)}
			</div>
			<SwitchBannerArrow isForward={true} />
		</section>
	);
};
export default Banner;
