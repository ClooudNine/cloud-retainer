'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useBannerContext } from '@/app/wish-simulator/banner-provider';
import { playSfxEffect } from '@/lib/wish-simulator';
import { Character, Weapon } from '@/lib/db/schema';
import { BannerItems } from '@/lib/banners';
import { useAudioContext } from '@/app/wish-simulator/audio-provider';
import clsx from 'clsx';
import CloseButton from '@/components/wish-simulator/close-button';

const renderWeaponResult = (weapon: Weapon) => {
    const masterlessCurrencyClasses = clsx(
        'absolute flex items-end gap-8 w-[90%] h-[7%] bottom-[5%] right-[2%] xs:right-0.5 xs:bottom-[35%] xs:w-[22%]',
        {
            'animate-masterless-stardust-appearance text-[#f1aafc]': weapon.rare === '3',
            'animate-masterless-starglitter-appearance text-[#ffeb64]':
                weapon.rare !== '3',
        }
    );

    const starClasses = clsx('absolute animate-star-effect size-32', {
        'bg-[#fff4ff]': weapon.rare === '3',
        'bg-[#fff574]': weapon.rare !== '3',
    });

    const masterlessImageClasses = clsx('h-[120%] w-auto object-contain', {
        'drop-shadow-[0_0_30px_rgba(209,134,246,1)]': weapon.rare === '3',
        'drop-shadow-[0_0_30px_rgba(192,169,64,1)]': weapon.rare !== '3',
    });

    return (
        <>
            <div
                className={
                    'absolute top-[5%] flex animate-item-description-appearance xs:w-[30%] xs:top-[55%] xs:left-[5%]'
                }
            >
                <Image
                    src={`weapons/icons/${weapon.type}.webp`}
                    alt={'Иконка ' + weapon.type}
                    width={100}
                    height={100}
                    draggable={false}
                    className={'size-24 -mt-[10%] animate-item-icon-appearance'}
                />
                <div>
                    <p
                        className={
                            'text-white text-5xl/tight animate-item-title-appearance xs:text-4xl/tight'
                        }
                    >
                        {weapon.title}
                    </p>
                    <div className={'flex gap-1 mt-1'}>
                        {Array.from(Array(Number(weapon.rare)).keys()).map((number) => (
                            <Image
                                key={number}
                                src={'common/star.webp'}
                                width={40}
                                height={40}
                                alt={'Звезда'}
                                draggable={false}
                                style={{
                                    animationDelay: `${number * 100}ms`,
                                }}
                                className={
                                    'w-8 opacity-0 animate-item-stars-appearance xs:w-5'
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Image
                src={`weapons/backgrounds/${weapon.type}-background.webp`}
                alt={'Фон оружия'}
                draggable={false}
                fill
                className={'-z-10 object-contain animate-item-background-appearance'}
            />
            <Image
                src={`weapons/splash-arts/${weapon.title}.webp`}
                alt={weapon.title}
                draggable={false}
                fill
                className={`object-contain animate-wish-item-appearance`}
            />
            <div className={masterlessCurrencyClasses}>
                <div className={'h-[110%] flex items-center justify-center -ml-[10%]'}>
                    <div
                        style={{
                            clipPath:
                                'polygon(50% 0, 70% 30%, 99% 48%, 70% 70%, 50% 100%, 30% 70%, 0 50%, 30% 30%)',
                        }}
                        className={starClasses}
                    ></div>
                    <Image
                        src={
                            weapon.rare === '3'
                                ? 'wish-simulator/assets/masterless-stardust.webp'
                                : 'wish-simulator/assets/masterless-starglitter.webp'
                        }
                        width={256}
                        height={256}
                        alt={'Masterless currency'}
                        draggable={false}
                        className={masterlessImageClasses}
                    />
                </div>
                <div className={'flex flex-col gap-1 text-3xl/tight xs:text-base/tight'}>
                    <p className={'text-white'}>Бонус</p>
                    <p>
                        {weapon.rare === '3'
                            ? 'Блуждающая звёздная пыль'
                            : 'Блуждающий звёздный блеск'}
                    </p>
                    <p>{weapon.rare === '4' ? 'x2' : 'x15'}</p>
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
                    'absolute top-[4%] flex animate-item-description-appearance xs:top-[55%] xs:left-[10%]'
                }
            >
                <Image
                    src={`common/elements/${character.element}.svg`}
                    alt={character.element}
                    width={100}
                    height={100}
                    draggable={false}
                    className={'w-20 -mt-[12%] animate-item-icon-appearance'}
                />
                <div>
                    <p
                        className={
                            'text-white text-5xl/tight animate-item-title-appearance xs:text-4xl/tight'
                        }
                    >
                        {character.name}
                    </p>
                    <div className={'flex gap-1 mt-1'}>
                        {Array.from(Array(Number(character.rare)).keys()).map(
                            (number) => (
                                <Image
                                    key={number}
                                    src={'common/star.webp'}
                                    width={40}
                                    height={40}
                                    alt={'Звезда'}
                                    draggable={false}
                                    style={{
                                        animationDelay: `${number * 100}ms`,
                                    }}
                                    className={
                                        'w-8 opacity-0 animate-item-stars-appearance xs:w-5'
                                    }
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
            <Image
                src={`characters/splash-arts/${character.name}.webp`}
                alt={character.name}
                width={2048}
                height={1024}
                draggable={false}
                className={
                    '-z-10 animate-wish-item-appearance object-contain max-w-[300%] h-full'
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
        )
            return;

        if (currentItemIndex + 1 < pullCounts) {
            setIsAnimationPlaying(true);
            playSfxEffect(
                `sounds/${droppedItems[currentItemIndex + 1].rare}-star-item-obtain.mp3`
            );
            setTimeout(() => setIsAnimationPlaying(false), 900);
        }
        setCurrentItemIndex(currentItemIndex + 1);
    }, [currentItemIndex, droppedItems, isAnimationPlaying, isVideoPlaying, pullCounts]);

    const skipButtonClasses = clsx(
        'z-10 absolute flex items-center transition top-[1%] right-[3%] text-white text-xl sm:top-[3%]',
        {
            'opacity-0': !isSkipButtonVisible,
            'opacity-100': isSkipButtonVisible,
        }
    );

    return (
        <section
            className={
                'z-20 absolute h-full w-full flex justify-center items-center select-none overflow-hidden'
            }
            onClick={nextItemCallback}
        >
            <Image
                src={'wish-simulator/assets/wish-result-bg.webp'}
                alt={'Фон результата сделанных молитв'}
                fill
                draggable={false}
                className={'-z-10 object-cover'}
            />
            {currentItemIndex < (pullCounts === 10 ? pullCounts : 0) ? (
                <div
                    onClick={() => {
                        setIsVideoPlaying(false);
                        setIsAnimationPlaying(false);
                        setCurrentItemIndex(pullCounts === 10 ? pullCounts : 0);
                        if (pullCounts === 1)
                            playSfxEffect(
                                `sounds/${droppedItems[0].rare}-star-item-obtain.mp3`
                            );
                    }}
                    className={skipButtonClasses}
                >
                    Пропустить
                    <Image
                        src={'wish-simulator/assets/skip-wish-arrow.webp'}
                        width={30}
                        height={30}
                        alt={'Пропустить'}
                        draggable={false}
                        className={'w-8'}
                    />
                </div>
            ) : (
                <CloseButton
                    handler={() => {
                        audio?.play();
                        setDroppedItems([]);
                    }}
                    styles={'z-10 absolute top-[3%] right-[3%] size-8'}
                />
            )}
            {isVideoPlaying ? (
                <video
                    className={'object-cover w-full h-full'}
                    src={`https://content.retainer.cloud/wish-simulator/animations/${pullCounts}-pull-${maxRare}-star.mp4`}
                    autoPlay
                    onEnded={() => {
                        setIsVideoPlaying(false);
                        setCurrentItemIndex(currentItemIndex + 1);
                        playSfxEffect(
                            `sounds/${
                                droppedItems[currentItemIndex + 1].rare
                            }-star-item-obtain.mp3`
                        );
                    }}
                ></video>
            ) : currentItemIndex === 10 ? (
                <div
                    className={
                        'flex gap-1 py-8 ml-4 max-xs:overflow-x-scroll max-xs:no-scrollbar'
                    }
                >
                    {droppedItems
                        .sort((a, b) => {
                            const rareCompare = Number(b.rare) - Number(a.rare);
                            const nameTypeCompare =
                                Number('type' in a) - Number('type' in b);

                            return rareCompare || nameTypeCompare;
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

                            const splashArtClasses = clsx(
                                'absolute max-w-none drop-shadow-[8px_10px_1px_#000000]',
                                {
                                    'w-[140%]': 'name' in item,
                                    'w-[190%]': 'type' in item,
                                }
                            );

                            const itemIconClasses = clsx('absolute w-3/5 bottom-[12%]', {
                                'brightness-200': 'type' in item,
                            });

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
                                            src={'wish-simulator/assets/wish-card.webp'}
                                            width={128}
                                            height={541}
                                            alt={'Фон предмета итога молитв'}
                                            draggable={false}
                                            className={'max-xs:max-w-none w-36 xs:w-24'}
                                        />
                                        <Image
                                            src={
                                                'name' in item
                                                    ? `characters/wish-cards/${item.name}.webp`
                                                    : `weapons/splash-arts/${item.title}.webp`
                                            }
                                            alt={'name' in item ? item.name : item.title}
                                            draggable={false}
                                            width={512}
                                            height={1024}
                                            className={splashArtClasses}
                                        />
                                        <Image
                                            src={
                                                'name' in item
                                                    ? `common/elements/${item.element}.svg`
                                                    : `weapons/icons/${item.type}.webp`
                                            }
                                            alt={
                                                'name' in item ? item.element : item.type
                                            }
                                            draggable={false}
                                            width={100}
                                            height={100}
                                            className={itemIconClasses}
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
                                                    src={'common/star.webp'}
                                                    width={40}
                                                    height={40}
                                                    alt={'Звезда'}
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
                    className={'relative h-full w-full flex justify-center items-center'}
                >
                    <video
                        className={'absolute -z-10 w-full h-full object-cover'}
                        src={`https://content.retainer.cloud/wish-simulator/animations/${droppedItems[currentItemIndex].rare}stareffect.mp4`}
                        autoPlay
                    />
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
