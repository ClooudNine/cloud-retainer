'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import star from '@/public/common/star.webp';
import masterlessStardust from '@/public/wish-simulator/assets/masterless-stardust.webp';
import wishResultBackground from '@/public/wish-simulator/assets/wish-result-bg.webp';
import multiWishCard from '@/public/wish-simulator/assets/wish-card.webp';
import skipWishArrow from '@/public/wish-simulator/assets/skip-wish-arrow.webp';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { Character, Weapon } from '@/lib/db/schema';
import { BannerItems } from '@/lib/banners';
import { useAudioContext } from '@/app/wish-simulator/AudioProvider';
import clsx from 'clsx';
import CloseButton from '@/app/wish-simulator/components/headerComponents/CloseButton';

const renderWeaponResult = (weapon: Weapon) => {
    return (
        <>
            <div
                className={
                    'absolute top-[5%] flex items-center justify-center animate-item-description-appearance sm:w-1/4 sm:top-[55%] sm:left-[10%]'
                }
            >
                <Image
                    src={`/weapons/icons/${weapon.type}.webp`}
                    alt={'Иконка ' + weapon.type}
                    width={100}
                    height={100}
                    quality={100}
                    draggable={false}
                    className={'w-[10vh] -mt-[20%] animate-item-icon-appearance'}
                />
                <div>
                    <p
                        className={
                            'text-white leading-tight text-[4vh] animate-item-title-appearance sm:text-[5vh]'
                        }
                    >
                        {weapon.title}
                    </p>
                    <div className={'flex gap-1 mt-1'}>
                        {Array.from(Array(Number(weapon.rare)).keys()).map((number) => (
                            <Image
                                key={number}
                                src={star}
                                alt={'Звезда'}
                                quality={100}
                                draggable={false}
                                style={{
                                    animationDelay: `${number * 100}ms`,
                                }}
                                className={'w-[3vh] animate-item-stars-appearance'}
                            />
                        ))}
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
                className={'-z-10 absolute animate-item-background-appearance'}
            />
            <Image
                src={`/weapons/splash-arts/${weapon.title}.webp`}
                alt={weapon.title}
                width={512}
                height={1024}
                quality={100}
                draggable={false}
                className={`absolute h-4/5 w-auto animate-wish-item-appearance sm:h-full`}
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
                    'absolute w-full top-[4%] flex items-center justify-center animate-item-description-appearance sm:top-[55%] sm:w-[30%] sm:left-[10%]'
                }
            >
                <Image
                    src={`/common/elements/${character.element}.svg`}
                    alt={character.element}
                    width={50}
                    height={50}
                    quality={100}
                    draggable={false}
                    className={'w-[10vh] -mt-[10%] animate-item-icon-appearance'}
                />
                <div>
                    <p className={'text-white text-[5vh] animate-item-title-appearance'}>
                        {character.name}
                    </p>
                    <div className={'flex gap-1 mt-1'}>
                        {Array.from(Array(Number(character.rare)).keys()).map(
                            (number) => (
                                <Image
                                    key={number}
                                    src={star}
                                    alt={'Звезда'}
                                    quality={100}
                                    draggable={false}
                                    style={{
                                        animationDelay: `${number * 100}ms`,
                                    }}
                                    className={'w-[3vh] animate-item-stars-appearance'}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={`/characters/splash-arts/${character.name}.webp`}
                alt={character.name}
                quality={100}
                draggable={false}
                width={2048}
                height={1024}
                className={
                    '-z-10 animate-wish-item-appearance object-cover max-w-none w-[250%] sm:w-full'
                }
            />
        </>
    );
};

const WishDrop = ({ droppedItems }: { droppedItems: BannerItems }) => {
    const { audio } = useAudioContext();
    const { setDroppedItems } = useBannerContext();

    const pullCounts = droppedItems.length;
    const maxRare = Math.max(...droppedItems.map((item) => Number(item.rare)));

    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
    const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(false);
    const [isSkipButtonVisible, setIsSkipButtonVisible] = useState<boolean>(false);
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);

    const nextItemCallback = useCallback(() => {
        setIsSkipButtonVisible(true);
        if (
            isVideoPlaying ||
            isAnimationPlaying ||
            pullCounts === 1 ||
            currentItemIndex === 10
        ) {
            return;
        }
        if (currentItemIndex + 1 < pullCounts - 1) {
            setIsAnimationPlaying(true);
            playSfxEffect(
                `/sounds/${droppedItems[currentItemIndex + 1].rare}-star-item-obtain.mp3`
            );
            setTimeout(() => setIsAnimationPlaying(false), 1500);
        }
        setCurrentItemIndex(currentItemIndex + 1);
    }, [currentItemIndex, droppedItems, isAnimationPlaying, isVideoPlaying, pullCounts]);

    const skipButtonClasses = clsx(
        'z-10 absolute flex items-center transition top-[1%] right-[3%] text-white text-[2vh] sm:top-[4%]',
        {
            'opacity-0': !isSkipButtonVisible,
            'opacity-100': isSkipButtonVisible,
        }
    );

    return (
        <section
            className={
                'z-20 absolute h-full w-full flex justify-center items-center overflow-hidden font-genshin'
            }
            onClick={nextItemCallback}
        >
            <Image
                src={wishResultBackground}
                alt={'Фон результата сделанных молитв'}
                fill
                quality={100}
                draggable={false}
                className={'-z-10 object-cover'}
            />
            {currentItemIndex < pullCounts - 1 ? (
                <div
                    onClick={() => {
                        setIsVideoPlaying(false);
                        setIsAnimationPlaying(false);
                        if (pullCounts === 10) {
                            setCurrentItemIndex(10);
                        } else {
                            setCurrentItemIndex(0);
                        }
                    }}
                    className={skipButtonClasses}
                >
                    Пропустить
                    <Image
                        src={skipWishArrow}
                        alt={'Пропустить'}
                        quality={100}
                        draggable={false}
                    />
                </div>
            ) : (
                <CloseButton
                    handler={() => {
                        audio.current?.play();
                        setDroppedItems([]);
                    }}
                    styles={'z-10 absolute size-6 top-[3%] right-[3%] sm:size-[5vh]'}
                />
            )}
            {isVideoPlaying ? (
                <video
                    className={'absolute top-0 left-0 object-cover w-full h-full'}
                    src={`/wish-simulator/animations/${pullCounts}-pull-${maxRare}-star.mp4`}
                    autoPlay
                    onEnded={() => {
                        setIsVideoPlaying(false);
                        setCurrentItemIndex(currentItemIndex + 1);
                        nextItemCallback();
                    }}
                ></video>
            ) : currentItemIndex === 10 ? (
                <div className={'flex gap-1 select-none'}>
                    {droppedItems
                        .sort((a, b) => {
                            if (a.rare !== b.rare) {
                                return Number(b.rare) - Number(a.rare);
                            }

                            if ('name' in a && 'type' in b) {
                                return -1;
                            } else if ('type' in a && 'name' in b) {
                                return 1;
                            }

                            return 0;
                        })
                        .map((item, index) => {
                            const wishContainerClasses = clsx(
                                'transition hover:scale-105',
                                {
                                    'drop-shadow-three-star-item': item.rare === '3',
                                    'drop-shadow-four-star-item': item.rare === '4',
                                    'drop-shadow-five-star-item': item.rare === '5',
                                }
                            );

                            return (
                                <div
                                    key={item.title + '-' + index}
                                    className={wishContainerClasses}
                                >
                                    <div
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            clipPath:
                                                'polygon(0.00% 11.03%,6.04% 9.70%,9.41% 7.97%,21.60% 7.13%,25.70% 3.50%,49.86% 0.00%,72.00% 2.98%,78.93% 6.97%,89.50% 7.90%,93.70% 9.56%,100.00% 11.27%,99.86% 89.00%,94.15% 90.76%,90.96% 92.37%,79.89% 93.32%,73.43% 96.65%,50.07% 100%,26.26% 96.98%,21.81% 93.55%,9.99% 92.25%,6.28% 90.81%,0.00% 89.50%)',
                                        }}
                                        className={
                                            'flex flex-col justify-center items-center animate-multi-wish-appearance translate-x-[1400%]'
                                        }
                                    >
                                        <Image
                                            src={multiWishCard}
                                            alt={'Фон предмета итога молитв'}
                                            draggable={false}
                                            quality={100}
                                        />
                                        <Image
                                            src={
                                                'name' in item
                                                    ? `/characters/wish-cards/${item.name}.webp`
                                                    : `/weapons/splash-arts/${item.title}.webp`
                                            }
                                            alt={'name' in item ? item.name : item.title}
                                            draggable={false}
                                            quality={100}
                                            width={512}
                                            height={1024}
                                            className={`absolute max-w-none ${
                                                'name' in item ? 'w-[130%]' : 'w-[190%]'
                                            } drop-shadow-[8px_10px_1px_rgba(0,0,0,1)]`}
                                        />
                                        <Image
                                            src={
                                                'name' in item
                                                    ? `/common/elements/${item.element}.svg`
                                                    : `/weapons/icons/${item.type}.webp`
                                            }
                                            alt={
                                                'name' in item ? item.element : item.type
                                            }
                                            draggable={false}
                                            quality={100}
                                            width={100}
                                            height={100}
                                            className={`absolute w-3/5 bottom-[12%] ${
                                                'type' in item && 'brightness-200'
                                            }`}
                                        />
                                        <div
                                            className={
                                                'absolute w-full flex justify-center bottom-[9%]'
                                            }
                                        >
                                            {Array.from(
                                                Array(Number(item.rare)).keys()
                                            ).map((number) => (
                                                <Image
                                                    key={number + '-' + index}
                                                    src={star}
                                                    alt={'Звезда'}
                                                    quality={100}
                                                    draggable={false}
                                                    className={'w-[14%]'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <div
                    key={currentItemIndex}
                    className={'h-full w-full flex justify-center items-center'}
                >
                    <video
                        className={
                            '-z-10 absolute top-0 left-0 object-cover w-full h-full'
                        }
                        src={`/wish-simulator/animations/${droppedItems[currentItemIndex].rare}stareffect.mp4`}
                        autoPlay
                    ></video>
                    {'type' in droppedItems[currentItemIndex]
                        ? renderWeaponResult(droppedItems[currentItemIndex] as Weapon)
                        : renderCharacterResult(
                              droppedItems[currentItemIndex] as Character
                          )}
                </div>
            )}
        </section>
    );
};

export default WishDrop;
