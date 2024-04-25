import Image from 'next/image';
import clsx from 'clsx';

const Background = ({ isBlurred }: { isBlurred: boolean }) => {
    const backgroundClasses = clsx('-z-10 object-cover object-left', {
        blur: isBlurred,
    });

    return (
        <Image
            src={'wish-simulator/assets/wish-simulator-bg.webp'}
            alt={'Фоновое изображение раздела молитв'}
            fill
            className={backgroundClasses}
        />
    );
};
export default Background;
