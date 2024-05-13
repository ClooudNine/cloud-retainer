import Link from 'next/link';

const AuthLink = ({ title, link, children }: { title: string; link: string; children: React.ReactNode }) => {
    return (
        <Link
            href={link}
            className={
                'flex-1 flex items-center px-6 py-2 gap-4 bg-teal-300 rounded-lg transition hover:scale-105 hover:bg-teal-200'
            }
        >
            {children}
            {title}
        </Link>
    );
};

export default AuthLink;
