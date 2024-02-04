import Image from 'next/image';
import wishIcon from '@/public/wish-simulator/assets/wish-icon.webp';

const Title = () => {
    return (
        <div
            className={
                'z-20 text-white absolute flex items-center left-4 top-8 gap-4 xs:left-[4.5rem] lg:top-9'
            }
        >
            <Image
                src={wishIcon}
                alt={'Иконка раздела молитв'}
                draggable={false}
                quality={100}
                className={'w-14 xs:w-10'}
            />
            <p
                className={
                    'text-3xl lg:text-xl drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,1)]'
                }
            >
                Молитва
            </p>
        </div>
    );
};
export default Title;
