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
                'absolute w-[81%] h-[60%] top-[30%] left-[10%] genshin-scrollbar overflow-y-scroll pr-2 md:pr-0 md:overflow-auto md:top-[21%] md:h-[70%]'
            }
        >
            <p className={'text-[#595252] text-[2.5vw] md:text-[1.3vw]'}>
                Вероятность получения следующих предметов повышена!
            </p>
            <div className={'mt-1 flex flex-col gap-3 h-fit md:h-[92%]'}>
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
