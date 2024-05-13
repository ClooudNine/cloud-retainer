'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const NavbarLink = ({
    title,
    link,
    children,
    isOpenTab,
    closeTab,
}: {
    title: string;
    link: string;
    children: React.ReactNode;
    isOpenTab: boolean;
    closeTab: () => void;
}) => {
    const pathname = usePathname();
    const isActiveLink = pathname.startsWith(link);

    const linkClasses = clsx(
        'w-full flex items-center h-20 p-4 gap-2.5 rounded-lg transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_#000000] xs:h-12 xs:justify-start xs:px-2 xs:py-2.5',
        {
            'bg-gray-300': !isActiveLink,
            'bg-black text-white [&_svg]:fill-white': isActiveLink,
            'justify-start': isOpenTab,
            'justify-center': !isOpenTab,
        }
    );

    const linkTitleClasses = clsx('xs:block', {
        block: isOpenTab,
        hidden: !isOpenTab,
    });

    return (
        <Link href={link} onClick={closeTab} className={linkClasses}>
            {children}
            <p className={linkTitleClasses}>{title}</p>
        </Link>
    );
};

export default NavbarLink;
