import Image from 'next/image';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const Background = ({ isBlurred }: { isBlurred: boolean }) => {
    const t = useTranslations('image-alts');
    const backgroundClasses = clsx('-z-10 object-cover object-left', {
        blur: isBlurred,
    });

    return (
        <Image
            src={'wish-simulator/assets/wish-simulator-bg.webp'}
            alt={t('wish-background')}
            fill
            className={backgroundClasses}
        />
    );
};
export default Background;
