'use client';
import { ChevronUp } from 'lucide-react';
import NavbarLink from '@/components/main/navbar-link';
import { Links } from '@/lib/types';
import { useState } from 'react';
import { clsx } from 'clsx';

const NavbarLinks = ({ links }: { links: Links }) => {
    const [isOpenLinkTab, setIsOpenLinkTab] = useState<boolean>(false);

    const linksClasses = clsx(
        'w-full max-xs:fixed bottom-0 max-xs:px-4 rounded-t-3xl flex justify-center items-center bg-gray-200 gap-4 max-xs:shadow-[0_-10px_35px_#000000] transition-[height] xs:flex-col xs:flex-1 xs:overflow-y-auto',
        {
            'h-full flex-col': isOpenLinkTab,
            'z-10 h-28 flex-row': !isOpenLinkTab,
        }
    );

    const expanderClasses = clsx('z-10 absolute px-20 xs:hidden', {
        'top-6 bg-white rounded-full': isOpenLinkTab,
        '-top-11 bg-gray-200 rounded-t-3xl': !isOpenLinkTab,
    });

    const chevronClasses = clsx('size-14', {
        'rotate-180': isOpenLinkTab,
    });

    return (
        <div className={linksClasses}>
            <button onClick={() => setIsOpenLinkTab(!isOpenLinkTab)} className={expanderClasses}>
                <ChevronUp className={chevronClasses} />
            </button>
            {links.map(({ title, link, icon }) => (
                <NavbarLink
                    key={link}
                    title={title}
                    link={link}
                    isOpenTab={isOpenLinkTab}
                    closeTab={() => setIsOpenLinkTab(false)}
                >
                    {icon}
                </NavbarLink>
            ))}
        </div>
    );
};

export default NavbarLinks;
