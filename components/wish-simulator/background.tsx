import Image from 'next/image';
import clsx from 'clsx';

const Background = ({ isBlurred }: { isBlurred: boolean }) => {
    const backgroundClasses = clsx('-z-10 object-cover object-left', {
        blur: isBlurred,
    });

    return (
        <div className={'-z-10 fixed w-full h-full'}>
            <div
                className={
                    'w-full h-full shadow-[0_-50px_100px_50px_rgba(0,0,0,0.25)_inset]'
                }
            ></div>
            <Image
                src={'wish-simulator/assets/wish-simulator-bg.webp'}
                alt={'Фоновое изображение раздела молитв'}
                fill
                className={backgroundClasses}
            />
        </div>
    );
};
export default Background;
