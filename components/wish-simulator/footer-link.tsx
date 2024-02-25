import Link from 'next/link';
import { playSfxEffect } from '@/lib/wish-simulator';

const FooterLink = ({
    title,
    link,
    sfxEffect,
}: {
    title: string;
    link: string;
    sfxEffect: string;
}) => {
    return (
        <Link
            onClick={() => playSfxEffect(`/sounds/${sfxEffect}.mp3`)}
            className={
                'cursor-genshin text-center flex justify-center h-[30%] px-16 py-1.5 items-center text-[#3f4658] text-3xl bg-[#e2ded5] rounded-full transition hover:shadow-[0_0_0_2px_rgba(34,60,80,0.1)_inset] hover:ring hover:ring-white active:ring active:text-white active:bg-[#d2d0c1] active:shadow-none active:ring-[#8798a7] xs:text-base xs:px-9'
            }
            href={`/wish-simulator/${link}`}
        >
            {title}
        </Link>
    );
};

export default FooterLink;
