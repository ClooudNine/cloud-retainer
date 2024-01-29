import Link from 'next/link';
import { playSfxEffect } from '@/app/wish-simulator/utils';
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
            className={`font-genshin cursor-genshin flex justify-center items-center
         w-4/5
         h-1/3
         min-w-max
         text-[#3f4658]
         text-base
         bg-[#e2ded5]
         rounded-full
         transition-all
         hover:shadow-[0_0_0_2px_rgba(34,60,80,0.1)_inset]
         hover:ring
         hover:ring-[#ffffff]
         active:text-[#ffffff]
         active:bg-[#d2d0c1]
         active:shadow-none
         active:ring
         active:ring-[#8798a7]
         md:w-1/4
         md:h-4/5
         md:text-lg
         lg:text-xl`}
            href={`/wish-simulator/${link}`}
        >
            {title}
        </Link>
    );
};

export default FooterLink;
