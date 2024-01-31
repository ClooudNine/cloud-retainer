import IncreasedChanceList from '@/app/wish-simulator/details/components/increasedChanceSection/IncreasedChanceList';
import { BannerTypes, Character, Weapon } from '@/lib/db/schema';

const IncreasedChance = ({
    bannerType,
    mainItems,
    featuredItems,
}: {
    bannerType: BannerTypes;
    mainItems: Character[] | Weapon[] | null;
    featuredItems: Character[] | Weapon[] | null;
}) => {
    return (
        <div
            className={
                'absolute w-[81%] h-[76%] left-[10%] top-[16%] sm:top-[21%] sm:h-[63%]'
            }
        >
            <p className={'text-[#595252] text-[2.5cqw] sm:text-[1.7cqw]'}>
                Вероятность получения следующих предметов повышена!
            </p>
            <div className={'mt-1 h-full flex flex-col gap-[1.2cqw]'}>
                <IncreasedChanceList
                    rare={'5'}
                    bannerType={bannerType}
                    items={mainItems}
                />
                <IncreasedChanceList
                    rare={'4'}
                    bannerType={bannerType}
                    items={featuredItems}
                />
            </div>
        </div>
    );
};
export default IncreasedChance;
