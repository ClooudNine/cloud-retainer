'use client';
import Image from 'next/image';
import bannerButtonBackground from '@/public/wish-simulator/banner-button-background.png';
import bannerButtonBackgroundActive from '@/public/wish-simulator/banner-button-background-active.png';
import { Banners } from '@/app/types/banner';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import classNames from 'classnames';

type BannerButtonProps = {
	banner: Banners;
	portraitUrl: string[];
};
const BannerButton = ({ banner, portraitUrl }: BannerButtonProps) => {
	const { selectedBanner, switchBanner } = useBannerContext();

	const bannerButtonContainerClasses = classNames(
		'relative flex justify-center items-center h-[45%] w-1/4 select-none transition-all hover:scale-110 sm:h-[60%] md:h-[30%] lg:h-[40%]',
		{
			'scale-110': banner === selectedBanner
		}
	);

	const portraitClasses = classNames('absolute select-none top-[40%] h-[80%] w-auto transition-all', {
		'-translate-y-4': banner === selectedBanner,
		'-rotate-12': banner.type === 'Weapon Event Wish'
	});
	return (
		<button className={bannerButtonContainerClasses}>
			<Image
				src={banner === selectedBanner ? bannerButtonBackgroundActive : bannerButtonBackground}
				alt={'Фон кнопки выбора баннера'}
				draggable={false}
				fill
				onClick={() => switchBanner(banner, 'Banner button')}
			/>
			<div
				className={'absolute bottom-0 flex justify-center transition-all overflow-hidden self-start w-full h-[215%] pointer-events-none'}
			>
				{portraitUrl.map((url, index) => (
					<Image
						key={url}
						src={url}
						alt={'Портрет ' + selectedBanner.type !== 'Weapon Event Wish' ? 'персонажа' : 'оружия'}
						quality={100}
						draggable={false}
						width={200}
						height={200}
						className={
							portraitClasses + ` ${banner.type === 'Weapon Event Wish' ? (index === 0 ? '-translate-x-6' : 'translate-x-6') : ''}`
						}
					/>
				))}
			</div>
		</button>
	);
};

export default BannerButton;
