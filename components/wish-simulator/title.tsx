import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Title = () => {
    const t = useTranslations('wish-simulator');

    return (
        <div className={'absolute flex items-center left-4 top-8 gap-4 text-white xs:left-[4.5rem] lg:top-9'}>
            <Image
                src={'wish-simulator/assets/wish-icon.webp'}
                width={53}
                height={53}
                alt={t('title')}
                draggable={false}
                className={'w-14 xs:w-10'}
            />
            <p className={'text-3xl drop-shadow-[0_0.5px_1.5px_#000000] lg:text-xl'}>{t('title')}</p>
        </div>
    );
};

export default Title;
