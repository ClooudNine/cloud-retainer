import Image from 'next/image';
import shopIcon from '@/public/wish-simulator/assets/shop/icon-shop.webp';
import SidebarButton from '@/app/wish-simulator/shop/components/SidebarButton';

const Sidebar = () => {
    return (
        <aside
            className={
                'z-10 w-full bg-gradient-to-b from-[#4b5265] fixed bottom-0 border-x-2 border-x-[#858282] sm:w-36 sm:static sm:h-full lg:w-72'
            }
        >
            <div
                className={
                    'hidden relative text-[#d5b98d] bg-[#3b4255] overflow-hidden border-b-2 border-b-[#394053] text-center sm:block sm:py-2 sm:text-xl lg:text-3xl lg:py-6'
                }
            >
                <Image
                    src={shopIcon}
                    alt={'Иконка магазина'}
                    quality={100}
                    draggable={false}
                    className={
                        'absolute top-0 left-2 h-[120%] w-auto opacity-30 brightness-50'
                    }
                />
                <p className={'relative'}>Магазин</p>
            </div>
            <div className={'flex gap-2 sm:block'}>
                <SidebarButton
                    title={'Магазин Паймон'}
                    section={'paimon-bargain'}
                ></SidebarButton>
                <SidebarButton
                    title={'Пополнение кристаллов'}
                    section={'genesis-crystals'}
                ></SidebarButton>
            </div>
        </aside>
    );
};

export default Sidebar;
