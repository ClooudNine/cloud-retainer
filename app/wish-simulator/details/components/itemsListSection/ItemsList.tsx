import { BannerItems, Banners } from '@/lib/banners';
import { getBannerDrop } from '@/app/wish-simulator/utils';
import ItemsTable from '@/app/wish-simulator/details/components/itemsListSection/ItemsTable';
import { Character, characters, Rares, Weapon, weapons } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { isNotNull } from 'drizzle-orm';

const getItemsByRarity = (
    bannerItems: BannerItems,
    rare: Rares,
    itemsToMove?: (Character | Weapon)[] | null
) => {
    let itemsByRarity = bannerItems.filter(
        (item) =>
            item.rare === rare &&
            !itemsToMove?.some((itemToMove) => itemToMove.id === item.id)
    );
    if (itemsToMove) {
        itemsToMove.forEach((item) => itemsByRarity.unshift(item));
    }
    return itemsByRarity;
};
const ItemsList = async ({
    banner,
    mainItems,
    featuredItems,
}: {
    banner: Banners;
    mainItems: Character[] | Weapon[] | null;
    featuredItems: Character[] | Weapon[] | null;
}) => {
    const charactersFromWishes: Character[] = await db
        .select()
        .from(characters)
        .where(isNotNull(characters.inStandardWish));

    const weaponsFromWishes: Weapon[] = await db
        .select()
        .from(weapons)
        .where(isNotNull(weapons.inStandardWish));

    const bannerItems = getBannerDrop(
        banner,
        charactersFromWishes,
        weaponsFromWishes,
        featuredItems?.map((item) => item.id)
    );

    const fiveStarItems = getItemsByRarity(bannerItems, '5', mainItems);
    const fourStarItems = getItemsByRarity(bannerItems, '4', featuredItems);
    const threeStarItems = getItemsByRarity(bannerItems, '3');

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
