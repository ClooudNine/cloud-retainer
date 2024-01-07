import Image from 'next/image';
import shopIcon from '@/public/wish-simulator/assets/icon-shop.webp';
import SidebarButton from '@/app/wish-simulator/shop/components/SidebarButton';
import PaimonBargainIcon from '@/app/wish-simulator/shop/components/icons/PaimonBargainIcon';
import GenesisIcon from '@/app/wish-simulator/shop/components/icons/GenesisIcon';

const Sidebar = () => {
    return (
        <aside
            className={
                'hidden md:block bg-gradient-to-b w-72 border-x-2 border-x-[#858282] from-[#4b5265] top-0 left-0 h-full'
            }
        >
            <div
                className={
                    'relative text-[#d5b98d] bg-[#3b4255] overflow-hidden border-b-2 border-b-[#394053] py-6 pl-8 text-3xl'
                }
            >
                <Image
                    src={shopIcon}
                    alt={'Магазин'}
                    quality={100}
                    draggable={false}
                    className={
                        'absolute top-0 left-2 h-[120%] w-auto opacity-30 brightness-50'
                    }
                />
                <p className={'relative z-10'}>Магазин</p>
            </div>
            <div className={'pt-12 w-full flex flex-col gap-8'}>
                <SidebarButton title={'Магазин Паймон'} param={'paimonBargain'}>
                    <PaimonBargainIcon />
                </SidebarButton>
                <SidebarButton title={'Пополнение кристаллов'} param={'genesisCrystals'}>
                    <GenesisIcon />
                </SidebarButton>
            </div>
        </aside>
    );
};

export default Sidebar;
