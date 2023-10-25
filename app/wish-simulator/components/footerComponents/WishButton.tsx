import Image from 'next/image';
import wishButton from '@/public/wish-simulator/wish-button.png';
import intertwinedFate from '@/public/wish-simulator/intertwined-fate.webp';

const WishButton = ({ count }: { count: number }) => {
	return (
		<button
			className={
				'relative w-full h-2/5 min-w-max transition-all select-none cursor-genshin duration-300 active:brightness-[0.85] md:h-[60%] md:w-[45%] xl:w-[35%]'
			}
		>
			<Image src={wishButton} quality={100} fill alt={`Помолиться ${count} раз`} className={'-z-10'} />
			<p className={'font-genshin text-sm text-[#b4a08c] whitespace-nowrap sm:text-base lg:text-xl'}>Помолиться {count} раз</p>
			<div className={'flex h-1/2 justify-center items-center'}>
				<Image src={intertwinedFate} alt={'Переплетающиеся судьбы'} width={32} height={32} className={'pointer-events-none'} />
				<p className={'font-genshin text-sm text-[#ff5f40] sm:text-base lg:text-xl'}>x {count}</p>
			</div>
		</button>
	);
};

export default WishButton;
