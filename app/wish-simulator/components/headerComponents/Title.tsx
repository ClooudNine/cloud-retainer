import Image from 'next/image';
import wishIcon from '@/public/wish-simulator/assets/wish-icon.png';

const Title = () => {
	return (
		<div
			className={
				'col-start-1 col-end-3 flex items-center gap-2 md:justify-center md:flex-col lg:flex-row ml-2 sm:gap-4 md:ml-4 xl:gap-6'
			}
		>
			<Image
				src={wishIcon}
				alt={'Иконка раздела молитв'}
				quality={100}
				className={'h-[30%] w-auto xl:h-2/5'}
			/>
			<p
				className={
					'font-genshin text-white text-base drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] sm:text-xl xl:text-2xl'
				}
			>
				Молитва
			</p>
		</div>
	);
};
export default Title;
