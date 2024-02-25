import Image from 'next/image';
import rareStar from '@/public/common/star.webp';
import fiveStarItemBackground from '@/public/common/items-backgrounds-by-rarity/background-item-5-star.webp';
import Star from '@/components/icons/star';
import stars from '@/public/wish-simulator/assets/stars-animation.webp';
import { playSfxEffect } from '@/lib/wish-simulator';
import { Currencies } from '@/lib/banners';
import { currenciesTranslate } from '@/lib/shop';

const ObtainItemScreen = ({
    item,
    count,
    closeSuccessfulPurchase,
}: {
    item: Currencies;
    count: number;
    closeSuccessfulPurchase: () => void;
}) => {
    return (
        <section
            onClick={() => {
                playSfxEffect('/sounds/click-9.mp3');
                closeSuccessfulPurchase();
            }}
            className={
                'z-20 bg-black/40 absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-6 overflow-hidden'
            }
        >
            <Image
                src={stars}
                alt={'Звёзды'}
                quality={100}
                draggable={false}
                className={'max-h-full max-w-none w-auto absolute animate-obtain-item'}
            />
            <div className={'flex flex-col items-center gap-6 animate-modal-appearance'}>
                <div className={'flex gap-4 items-center'}>
                    <Star styles={'size-[2vh] fill-[#d6bb8e] -mb-[15%]'} />
                    <p className={'text-[#d6bb8e] text-[4vh]'}>Получено:</p>
                    <Star styles={'size-[4vh] fill-[#d6bb8e] -mt-[15%]'} />
                </div>
                <div
                    className={
                        'min-w-80 w-[45vw] h-[40vh] flex flex-col justify-center items-center gap-2 border-y-2 border-[#d3bd8c] border-opacity-40'
                    }
                >
                    <div className={'bg-[#e9e5dc] rounded-[1.5vh] h-[22vh] w-[17vh]'}>
                        <div
                            className={
                                'relative flex items-center justify-center h-[83%]'
                            }
                        >
                            <Image
                                src={fiveStarItemBackground}
                                alt={'Фон пятизвёздочного предмета'}
                                quality={100}
                                draggable={false}
                                fill
                                className={'rounded-t-[1.5vh] rounded-br-[4vh]'}
                            />
                            <Image
                                src={`/wish-simulator/assets/${item}.webp`}
                                alt={currenciesTranslate[item]}
                                width={200}
                                height={200}
                                quality={100}
                                draggable={false}
                                className={'relative h-[85%] w-auto'}
                            />
                            <div
                                className={
                                    'absolute w-full flex justify-center -bottom-[4%] '
                                }
                            >
                                {Array.from(Array(Number(5)).keys()).map((number) => (
                                    <Image
                                        key={number}
                                        src={rareStar}
                                        alt={'Звезда'}
                                        quality={100}
                                        draggable={false}
                                        className={'w-[15%] drop-shadow'}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className={'text-[#4a505e] text-center text-[2.2vh] mt-[2%]'}>
                            {count}
                        </p>
                    </div>
                    <p className={'text-white text-center text-[2vh]'}>
                        {currenciesTranslate[item]}
                    </p>
                </div>
                <p className={'text-[#aca59d] text-[2.5vh]'}>Нажмите, чтобы продолжить</p>
            </div>
        </section>
    );
};

export default ObtainItemScreen;
