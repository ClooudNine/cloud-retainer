import Image from 'next/image';
import epitomizedPathButtonActive from '@/public/wish-simulator/assets/epitomized-path-button-active.webp';
import epitomizedPathButton from '@/public/wish-simulator/assets/epitomized-path-button.webp';
import { useState } from 'react';
import EpitomizedPathModal from '@/components/wish-simulator/epitomized-path-modal';
import { useBannerContext } from '@/app/wish-simulator/banner-provider';

const EpitomizedPathButton = () => {
    const { selectedBanner, epitomizedPath } = useBannerContext();

    const [epitomizedPathIsOpen, setEpitomizedPathIsOpen] = useState<boolean>(false);

    return (
        <>
            <div
                className={
                    'group absolute bottom-72 left-4 animate-banner-preview-appearance hover:scale-105 xs:bottom-36 xs:left-40'
                }
                onClick={() => setEpitomizedPathIsOpen(true)}
            >
                <Image
                    src={epitomizedPathButton}
                    alt={'Путь воплощения'}
                    quality={100}
                    draggable={false}
                    className={'w-52 xs:w-36 group-hover:hidden'}
                />
                <Image
                    src={epitomizedPathButtonActive}
                    alt={'Путь воплощения при наведении'}
                    quality={100}
                    draggable={false}
                    className={'hidden w-52 xs:w-36 group-hover:block'}
                />
                <div
                    className={
                        'absolute bottom-0 text-2xl/none flex justify-center items-center text-center text-[#525b6c] px-2 w-full h-[30%] xs:text-base/none'
                    }
                >
                    {epitomizedPath[selectedBanner.id]
                        ? `${epitomizedPath[selectedBanner.id].count}/2`
                        : 'Путь воплощения'}
                </div>
            </div>
            {epitomizedPathIsOpen && (
                <EpitomizedPathModal closeModal={() => setEpitomizedPathIsOpen(false)} />
            )}
        </>
    );
};
export default EpitomizedPathButton;
