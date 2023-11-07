'use client';
import Image from 'next/image';
import bannerButtonBackground from '@/public/wish-simulator/assets/banner-button-background.png';
import bannerButtonBackgroundActive from '@/public/wish-simulator/assets/banner-button-background-active.png';
import { Banners } from '@/app/types/banner';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import classNames from 'classnames';
import { getBannerItemName } from '@/app/wish-simulator/utils';

const BannerButton = ({
	banner,
	portraitUrl
}: {
	banner: Banners;
	portraitUrl: string[];
}) => {
	const { selectedBanner, characters, weapons, switchBanner } =
		useBannerContext();

	const bannerButtonContainerClasses = classNames(
		'relative h-[45%] w-1/4 select-none transition-all cursor-genshin hover:scale-110 sm:h-3/5 md:h-[30%] lg:h-2/5',
		{
			'scale-110': banner === selectedBanner
		}
	);

	const portraitClasses = classNames(
		'absolute select-none top-[40%] h-4/5 w-auto transition-all',
		{
			'-translate-y-[20%]': banner === selectedBanner,
			'-rotate-12': banner.type === 'Weapon Event Wish'
		}
	);
	return (
		<button className={bannerButtonContainerClasses}>
			<Image
				src={
					banner === selectedBanner
						? bannerButtonBackgroundActive
						: bannerButtonBackground
				}
				alt={'Фон кнопки выбора баннера'}
				draggable={false}
				fill
				onClick={() => switchBanner(banner, 'Banner button')}
			/>
			<div
				className={
					'absolute bottom-1 flex justify-center transition-all overflow-hidden w-full h-[215%] pointer-events-none'
				}
			>
				{portraitUrl.map((url, index) => (
					<Image
						key={url}
						src={url}
						alt={getBannerItemName(selectedBanner, characters, weapons, index)}
						quality={100}
						draggable={false}
						width={200}
						height={200}
						className={
							portraitClasses +
							` ${
								banner.type === 'Weapon Event Wish'
									? index === 0
										? '-translate-x-[25%]'
										: 'translate-x-[25%]'
									: ''
							}`
						}
					/>
				))}
			</div>
		</button>
	);
};

export default BannerButton;
