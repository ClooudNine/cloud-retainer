import Image from 'next/image';
import SidebarButton from '@/components/wish-simulator/shop/sidebar-button';
import { useTranslations } from 'next-intl';

const Sidebar = () => {
    const t = useTranslations();

    return (
        <aside
            className={
                'w-full bg-gradient-to-b from-[#4b5265] max-xs:fixed bottom-0 border-x-2 border-x-[#858282] xs:w-60 xs:h-full'
            }
        >
            <div
                className={
                    'hidden relative text-[#d5b98d] bg-[#3b4255] overflow-hidden border-b-2 border-b-[#394053] text-center xs:block xs:py-4 xs:text-2xl'
                }
            >
                <Image
                    src={'wish-simulator/assets/shop/icon-shop.webp'}
                    width={256}
                    height={256}
                    alt={t('image-alts.shop-icon')}
                    className={'absolute top-0 left-2 h-[120%] w-auto opacity-30 brightness-50'}
                />
                <p className={'relative'}>{t('wish-simulator.shop')}</p>
            </div>
            <div className={'flex gap-2 xs:block'}>
                <SidebarButton
                    title={t('wish-simulator.paimon-bargain')}
                    section={'paimon-bargain'}
                ></SidebarButton>
                <SidebarButton
                    title={t('wish-simulator.genesis-crystals')}
                    section={'genesis-crystals'}
                ></SidebarButton>
            </div>
        </aside>
    );
};

export default Sidebar;
