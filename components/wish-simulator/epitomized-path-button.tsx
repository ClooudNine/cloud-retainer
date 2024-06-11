import Image from 'next/image';
import { useState } from 'react';
import EpitomizedPathModal from '@/components/wish-simulator/epitomized-path-modal';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';
import { playSfxEffect } from '@/lib/wish-simulator';

const EpitomizedPathButton = () => {
    const { selectedBanner, epitomizedPath } = useBannerContext();

    const [epitomizedPathIsOpen, setEpitomizedPathIsOpen] = useState<boolean>(false);

    return (
        <>
            <div
                className={
                    'group w-52 h-40 absolute bottom-72 left-4 animate-banner-preview-appearance transition hover:scale-105 hover:brightness-105 xs:bottom-36 xs:left-40 xs:w-36 xs:h-28'
                }
                onClick={() => {
                    playSfxEffect('sounds/click-6.mp3');
                    setEpitomizedPathIsOpen(true);
                }}
            >
                <Image
                    src={'wish-simulator/assets/epitomized-path-button.webp'}
                    fill
                    alt={'Путь воплощения'}
                    draggable={false}
                />
                <Image
                    src={'wish-simulator/assets/epitomized-path-button-active.webp'}
                    fill
                    alt={'Путь воплощения при наведении'}
                    draggable={false}
                    className={'hidden group-active:block'}
                />
                <div
                    className={
                        'absolute flex justify-center items-center w-full bottom-0 text-2xl/none text-center text-[#525b6c] h-[30%] xs:text-base/none'
                    }
                >
                    {epitomizedPath[selectedBanner.id]
                        ? `${epitomizedPath[selectedBanner.id].count}/2`
                        : 'Путь воплощения'}
                </div>
            </div>
            {epitomizedPathIsOpen && (
                <EpitomizedPathModal
                    closeModal={() => {
                        playSfxEffect('sounds/click-10.mp3');
                        setEpitomizedPathIsOpen(false);
                    }}
                />
            )}
        </>
    );
};
export default EpitomizedPathButton;
