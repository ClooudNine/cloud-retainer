import Image from 'next/image';

const Logo = ({ styles }: { styles?: string }) => {
    return (
        <div className={`flex items-center text-3xl/tight ${styles}`}>
            <p className={'drop-shadow-[0_1px_10px_#000000]'}>
                Cloud
                <br /> Retainer
            </p>
            <Image
                src={'common/logo.webp'}
                alt={'Логотип Cloud Retainer'}
                width={256}
                height={256}
                className={'w-20'}
            />
        </div>
    );
};

export default Logo;
