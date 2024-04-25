import Image from 'next/image';

const Title = () => {
    return (
        <div
            className={
                'absolute flex items-center left-4 top-8 gap-4 text-white xs:left-[4.5rem] lg:top-9'
            }
        >
            <Image
                src={'wish-simulator/assets/wish-icon.webp'}
                width={53}
                height={53}
                alt={'Иконка раздела молитв'}
                draggable={false}
                className={'w-14 xs:w-10'}
            />
            <p className={'text-3xl drop-shadow-[0_0.5px_1.5px_#000000] lg:text-xl'}>Молитва</p>
        </div>
    );
};

export default Title;
