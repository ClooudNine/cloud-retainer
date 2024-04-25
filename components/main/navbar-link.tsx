'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

const NavbarLink = ({
    title,
    link,
    children,
}: {
    title: string;
    link: string;
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const isActiveLink = pathname.startsWith(link);

    const linkClasses = clsx(
        'flex h-12 items-center gap-2 rounded-lg px-2 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]',
        {
            'bg-gray-300': !isActiveLink,
            'bg-black text-white [&_svg]:fill-white': isActiveLink,
        }
    );

    return (
        <Link href={link} className={linkClasses}>
            {children}
            {title}
        </Link>
    );
};

export default NavbarLink;
