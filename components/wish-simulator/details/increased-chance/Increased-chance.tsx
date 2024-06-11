import IncreasedChanceList from '@/components/wish-simulator/details/increased-chance/Increased-chance-list';
import { BannerTypes, Character, Weapon } from '@/lib/types';
import { useTranslations } from 'next-intl';

const IncreasedChance = ({
    bannerType,
    mainItems,
    featuredItems,
}: {
    bannerType: BannerTypes;
    mainItems: Character[] | Weapon[];
    featuredItems: Character[] | Weapon[];
}) => {
    const t = useTranslations('wish-simulator');

    return (
        <div className={'absolute w-[81%] h-[76%] left-[10%] top-[16%] xs:top-[21%] xs:h-[63%]'}>
            <p className={'text-[#595252] text-lg'}>{t('chances-up')}</p>
            <div className={'mt-1 h-full flex flex-col gap-2'}>
                <IncreasedChanceList rare={'5'} bannerType={bannerType} items={mainItems} />
                <IncreasedChanceList rare={'4'} bannerType={bannerType} items={featuredItems} />
            </div>
        </div>
    );
};
export default IncreasedChance;
