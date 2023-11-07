import primogem from '@/public/wish-simulator/assets/primogem.webp';
import intertwinedFate from '@/public/wish-simulator/assets/intertwined-fate.webp';
import Image from 'next/image';

const CurrentBalance = () => {
	return (
		<div
			className={
				'col-start-5 col-end-11 flex items-center gap-3 sm:col-start-8 sm:col-end-12 md:ml-4 md:col-start-9 xl:col-start-10 justify-end select-none font-genshin'
			}
		>
			<div
				className={
					'relative flex h-[30%] w-[70%] items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5] md:h-1/4 2xl:min-w-max 2xl:w-1/2'
				}
			>
				<div className={'absolute h-full w-full peer'}></div>
				<Image
					src={primogem}
					alt={'Примогем'}
					quality={100}
					draggable={false}
					width={40}
					className={
						'h-[85%] w-auto drop-shadow-lg transition-all active:opacity-50 peer-active:opacity-50'
					}
				/>
				<p
					className={
						'text-white text-base ml-2 mr-1 max-2xl:truncate md:text-lg'
					}
				>
					0
				</p>
				<button
					className={
						'bg-[#ece5d8] z-10 text-[#3b4354] w-1/4 h-[90%] ml-auto mr-0.5 text-lg md:text-xl font-bold flex justify-center items-center rounded-full transition-all cursor-genshin active:opacity-50 active:scale-95 hover:scale-110'
					}
				>
					+
				</button>
			</div>
			<div
				className={
					'group flex w-[30%] items-center h-[30%] md:h-1/4 bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5] 2xl:min-w-max'
				}
			>
				<Image
					src={intertwinedFate}
					alt={'Переплетающиеся судьбы'}
					quality={100}
					draggable={false}
					width={40}
					className={
						'h-full w-auto drop-shadow-lg select-none transition-all group-active:opacity-50'
					}
				/>
				<p className={'text-white text-base ml-1 max-2xl:truncate md:text-lg'}>
					0
				</p>
			</div>
		</div>
	);
};
export default CurrentBalance;
