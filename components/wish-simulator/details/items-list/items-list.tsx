import { getBannerDrop, sortItemsForDetails } from '@/lib/wish-simulator';
import ItemsTable from '@/components/wish-simulator/details/items-list/items-table';
import { getCharactersFromWishes } from '@/data/character';
import { getWeaponsFromWishes } from '@/data/weapon';
import { Banners, Character, Weapon } from '@/lib/types';

const ItemsList = async ({
    banner,
    mainItems,
    featuredItems,
}: {
    banner: Banners;
    mainItems: Character[] | Weapon[];
    featuredItems: Character[] | Weapon[];
}) => {
    const charactersFromWishes: Character[] = await getCharactersFromWishes();
    const weaponsFromWishes: Weapon[] = await getWeaponsFromWishes();

    const bannerItems = getBannerDrop(banner, charactersFromWishes, weaponsFromWishes);

    const fiveStarItems = sortItemsForDetails(bannerItems, '5', mainItems);
    const fourStarItems = sortItemsForDetails(bannerItems, '4', featuredItems);
    const threeStarItems = sortItemsForDetails(bannerItems, '3');

    return (
        <div
            className={
                'absolute overflow-y-scroll genshin-scrollbar flex flex-col w-[86%] h-[75%] top-[16%] pr-2 left-[10%] xs:top-[21%] xs:h-[69%] xs:w-[83%]'
            }
        >
            <p className={'text-[#595252] text-xl'}>
                Список предметов, доступных для получения с помощью Молитвы:
            </p>
            <ItemsTable
                rare={'5'}
                items={fiveStarItems}
                mainItems={mainItems}
                bannerType={banner.type}
            />
            <ItemsTable
                rare={'4'}
                items={fourStarItems}
                mainItems={featuredItems}
                bannerType={banner.type}
            />
            <ItemsTable rare={'3'} items={threeStarItems} bannerType={banner.type} />
        </div>
    );
};

export default ItemsList;
