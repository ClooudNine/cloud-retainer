'use client';
import Image from 'next/image';
import shopButtonActive from '@/public/wish-simulator/assets/shop/shop-button-active.webp';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import PaimonBargainIcon from '@/app/wish-simulator/components/icons/PaimonBargainIcon';
import GenesisIcon from '@/app/wish-simulator/components/icons/GenesisIcon';
import StarIcon from '@/app/wish-simulator/components/icons/StarIcon';
import { playSfxEffect } from '@/app/wish-simulator/utils';

const SidebarButton = ({
    title,
    section,
}: {
    title: string;
    section: 'paimon-bargain' | 'genesis-crystals';
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const currentSection = pathname.split('/').pop();

    const isActiveSection = currentSection === section;

    const shopButtonClasses = clsx(
        'relative group flex items-center gap-4 w-full h-12 my-2 text-xs transition hover:bg-[rgba(236,229,216,0.2)] lg:text-xl lg:my-10 ',
        {
            'text-[#3b4254]': isActiveSection,
            'text-[#ece5d7] active:text-[#3b4254]': !isActiveSection,
        }
    );

    const buttonBackgroundClasses = clsx('absolute w-[105%] transition sm:max-w-none', {
        'opacity-100': isActiveSection,
        'opacity-0 group-active:opacity-100': !isActiveSection,
    });

    const starClasses = clsx(
        'hidden absolute w-4 fill-[#efe6df] right-0 transition duration-300 sm:block lg:w-8',
        {
            'opacity-100 translate-x-[125%]': isActiveSection,
            'opacity-0': !isActiveSection,
        }
    );

    return (
        <button
            className={shopButtonClasses}
            onClick={() => {
                playSfxEffect('/sounds/click-1.mp3');
                router.replace(`/wish-simulator/shop/${section}`);
            }}
        >
            <Image
                src={shopButtonActive}
                alt={'Фон активной кнопки магазина'}
                draggable={false}
                quality={100}
                className={buttonBackgroundClasses}
            />
            {section === 'paimon-bargain' ? (
                <PaimonBargainIcon isActiveSection={isActiveSection} />
            ) : (
                <GenesisIcon isActiveSection={isActiveSection} />
            )}
            <p className={'relative leading-tight text-left'}>{title}</p>
            <StarIcon styles={starClasses} />
        </button>
    );
};

export default SidebarButton;
