import Image from 'next/image';
import logo from '@/public/common/logo.webp';

const Logo = () => {
    return (
        <div className={'flex items-center text-3xl/tight'}>
            <p className={'drop-shadow-[0_1px_10px_rgba(0,0,0,1)]'}>
                Cloud
                <br /> Retainer
            </p>
            <Image src={logo} alt={'Logo'} quality={100} className={'w-20'} />
        </div>
    );
};

export default Logo;
