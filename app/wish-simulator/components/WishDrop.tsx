'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import star from '@/public/common/star.webp';
import masterlessStardust from '@/public/wish-simulator/assets/masterless-stardust.webp';
import wishResultBackground from '@/public/wish-simulator/assets/wish-result-bg.webp';
import { useBannerContext } from '@/app/wish-simulator/components/BannerProvider';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { Character, Weapon } from '@/lib/db/schema';
import { BannerItems } from '@/lib/banners';

const renderWeaponResult = (weapon: Weapon) => {
    return (
        <>
            <div
                className={
                    'absolute top-[7%] w-[90%] flex items-center justify-center animate-item-description-appearance md:top-[55%] md:w-[30%] md:left-[6vw]'
                }
            >
                <Image
                    src={`/weapons/icons/${weapon.type}.webp`}
                    alt={'Иконка ' + weapon.type}
                    width={150}
                    height={150}
                    quality={100}
                    draggable={false}
                    className={
                        'h-auto w-auto -mt-[15%] -mr-[5%] -z-10 animate-item-icon-appearance'
                    }
                />
                <div>
                    <p
                        className={
                            'text-white text-3xl leading-[1.1] animate-item-title-appearance md:text-5xl md:leading-[1.1]'
                        }
                    >
                        {weapon.title}
                    </p>
                    <div className={'flex gap-1 mt-2'}>
                        {Array.from(
                            { length: Number(weapon.rare) },
                            (_, index) => (
                                <Image
                                    key={index}
                                    src={star}
                                    alt={'Звезда'}
                                    quality={100}
                                    style={{
                                        animationDelay: `${
                                            (index + 1) * 100
                                        }ms`,
                                    }}
                                    className={
                                        'opacity-0 animate-item-stars-appearance'
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={`/weapons/backgrounds/${weapon.type}-background.webp`}
                alt={'Фон оружия'}
                width={950}
                height={950}
                quality={100}
                draggable={false}
                className={'absolute -z-10 animate-item-background-appearance'}
            />
            <Image
                src={`/weapons/splash-arts/${weapon.title}.webp`}
                width={700}
                height={700}
                alt={weapon.title}
                className={`${
                    weapon.type === 'Catalyst' ? 'h-[25%]' : 'h-[80%]'
                } w-auto max-h-[60%] -z-10 animate-wish-item-appearance md:max-h-full`}
            />
            <div
                className={
                    'absolute flex items-center gap-4 w-[90%] h-[9%] right-[5%] bottom-[7%] animate-masterless-currency-appearance md:w-[30%] md:right-0.5 md:bottom-[35%] lg:w-[22%]'
                }
            >
                <div className={'h-[110%] flex items-center justify-center'}>
                    <div
                        style={{
                            clipPath:
                                'polygon(50% 0, 70% 30%, 99% 48%, 70% 70%, 50% 100%, 30% 70%, 0 50%, 30% 30%)',
                        }}
                        className={
                            'absolute animate-star-effect bg-[#fff4ff] w-[8rem] h-[8rem] rounded-full md:w-[11rem] md:h-[11rem]'
                        }
                    ></div>
                    <Image
                        src={masterlessStardust}
                        alt={'Stardust/glitter'}
                        className={
                            'h-full w-auto object-contain drop-shadow-[0_0_30px_rgba(209,134,246,1)]'
                        }
                    />
                </div>
                <div className={'flex flex-col gap-3 mb-10 ml-6'}>
                    <p className={'text-white text-lg md:text-xl'}>Extra</p>
                    <p className={'text-[#f1aafc] text-xl md:text-2xl'}>
                        Masterless Stardust
                    </p>
                    <p className={'text-[#f1aafc] text-xl md:text-2xl'}>x15</p>
                </div>
            </div>
        </>
    );
};

const renderCharacterResult = (character: Character) => {
    return (
        <>
            <div
                className={
                    'absolute top-[7%] w-[90%] flex items-center justify-center animate-item-description-appearance md:top-[55%] md:w-[30%] md:left-[6vw]'
                }
            >
                <Image
                    src={`/common/elements/${character.element}.svg`}
                    alt={character.element}
                    width={100}
                    height={100}
                    quality={100}
                    draggable={false}
                    className={
                        '-mt-[10%] -mr-[1%] -z-10 animate-item-icon-appearance'
                    }
                />
                <div>
                    <p
                        className={
                            'text-white text-3xl leading-[1.1] animate-item-title-appearance md:text-5xl md:leading-[1.1]'
                        }
                    >
                        {character.name}
                    </p>
                    <div className={'flex gap-1 mt-2'}>
                        {Array.from(
                            { length: Number(character.rare) },
                            (_, index) => (
                                <Image
                                    key={index}
                                    src={star}
                                    alt={'Звезда'}
                                    quality={100}
                                    style={{
                                        animationDelay: `${
                                            (index + 1) * 100
                                        }ms`,
                                    }}
                                    className={
                                        'opacity-0 animate-item-stars-appearance'
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={`/characters/splash-arts/${character.name}.webp`}
                quality={100}
                alt={character.name}
                fill
                className={' -z-10 animate-wish-item-appearance object-contain'}
            />
        </>
    );
};

const WishDrop = ({ droppedItems }: { droppedItems: BannerItems }) => {
    const { audio, setDroppedItems } = useBannerContext();
    const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(true);
    const [obtainItemAnimationPlaying, setObtainItemAnimationPlaying] =
        useState<boolean>(true);
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

    const pullCounts = droppedItems.length;
    const maxRare = Math.max(...droppedItems.map((item) => Number(item.rare)));

    const nextItemCallback = useCallback(() => {
        if (currentItemIndex < droppedItems.length - 1) {
            setCurrentItemIndex(currentItemIndex + 1);
            setObtainItemAnimationPlaying(true);
            playSfxEffect(
                `/sounds/${
                    droppedItems[currentItemIndex + 1].rare
                }-star-item-obtain.mp3`
            );
            setTimeout(() => setObtainItemAnimationPlaying(false), 2000);
        } else {
            audio.current?.play();
            setDroppedItems([]);
        }
    }, [audio, currentItemIndex, droppedItems, setDroppedItems]);

    return (
        <section
            className={
                'absolute h-full w-full z-20 overflow-hidden select-none font-genshin'
            }
            onClick={
                isAnimationPlaying
                    ? undefined
                    : obtainItemAnimationPlaying
                      ? undefined
                      : () => nextItemCallback()
            }
        >
            <Image
                src={wishResultBackground}
                draggable={false}
                alt={'Фон результата сделанных молитв'}
                fill
                quality={100}
                className={'select-none object-cover -z-20'}
            />
            {isAnimationPlaying ? (
                <video
                    className={
                        'absolute top-0 left-0 object-cover w-screen h-screen'
                    }
                    src={`/wish-simulator/animations/${pullCounts}-pull-${maxRare}-star.mp4`}
                    autoPlay
                    onEnded={() => {
                        setIsAnimationPlaying(false);
                        playSfxEffect(
                            `/sounds/${droppedItems[currentItemIndex].rare}-star-item-obtain.mp3`
                        );
                        setTimeout(
                            () => setObtainItemAnimationPlaying(false),
                            2000
                        );
                    }}
                ></video>
            ) : (
                <div
                    key={currentItemIndex}
                    className={'h-full w-full flex items-center justify-center'}
                >
                    <video
                        className={
                            'absolute top-0 left-0 object-cover w-screen h-screen -z-10'
                        }
                        src={`/wish-simulator/animations/${droppedItems[currentItemIndex].rare}stareffect.mp4`}
                        autoPlay
                    ></video>
                    {'type' in droppedItems[currentItemIndex]
                        ? renderWeaponResult(
                              droppedItems[currentItemIndex] as Weapon
                          )
                        : renderCharacterResult(
                              droppedItems[currentItemIndex] as Character
                          )}
                </div>
            )}
        </section>
    );
};

export default WishDrop;
