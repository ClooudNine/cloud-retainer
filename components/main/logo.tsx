import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ styles }: { styles?: string }) => {
    return (
        <Link
            href={'/'}
            className={`flex items-center text-3xl/tight ${styles} transition duration-500 drop-shadow-[0_1px_10px_#000000] hover:scale-105`}
        >
            Cloud
            <br /> Retainer
            <Image
                src={'common/logo.webp'}
                alt={'Логотип Cloud Retainer'}
                width={256}
                height={256}
                className={'w-20'}
            />
        </Link>
    );
};

export default Logo;
