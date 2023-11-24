import Image from "next/image";
import star from "@/public/common-icons/star.webp";
import { getBannerGuaranteeRules } from "@/app/wish-simulator/details/components/IncreasedChanceSection";
import { BannerItems, Banners } from "@/app/types/banner";
import { getBannerDrop } from "@/app/wish-simulator/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { Rares } from "@/app/types/common";
import up from "@/public/wish-simulator/assets/up-icon.webp";

const getItemsByRarity = (
  banner: Banners,
  bannerItems: BannerItems,
  rare: Rares,
) => {
  const itemsByRarity = bannerItems.filter((item) => item.rare === rare);
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
    case "Novice Wish":
      const mainItemIndex = itemsByRarity.findIndex(
        (item) => item.id === banner.main_character && "name" in item,
      );
      const characterToMove = itemsByRarity.splice(mainItemIndex, 1)[0];
      itemsByRarity.unshift(characterToMove);
      return itemsByRarity;
    default:
      return [];
  }
};
export const dynamic = "force-dynamic";
const ItemsList = async ({
  banner,
  mainItems,
  featuredItems,
}: {
  banner: Banners;
  mainItems: Character[] | Weapon[] | null;
  featuredItems: Character[] | Weapon[] | null;
}) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: allCharactersFromWishes,
  }: {
    data: Character[] | null;
  } = await supabase
    .from("characters")
    .select("*")
    .not("in_standard_wish", "is", null);

  const {
    data: allWeaponsFromWishes,
  }: {
    data: Weapon[] | null;
  } = await supabase
    .from("weapons")
    .select("*")
    .not("in_standard_wish", "is", null);

  if (allCharactersFromWishes === null || allWeaponsFromWishes === null) {
    return <p>Data miss :(</p>;
  }

  const bannerItems = getBannerDrop(
    banner,
    allCharactersFromWishes,
    allWeaponsFromWishes,
  );

  const fiveStarItems = getItemsByRarity(banner, bannerItems, 5);
  const fourStarItems = getItemsByRarity(banner, bannerItems, 4);
  const threeStarItems = getItemsByRarity(banner, bannerItems, 3);

  return (
    <div
      className={
        "absolute overflow-y-scroll scrollbar-for-epitomized-path w-[81%] h-[68%] top-[23%] left-[10%] pr-2"
      }
    >
      <p className={"text-[#595252] text-[1.3vw]"}>
        Список предметов, доступных для получения с помощью Молитвы:
      </p>
      <div className={"h-[7%] flex justify-center items-center bg-[#cfb383]"}>
        <div
          className={
            "flex items-center pl-8 w-[99.5%] h-[90%] border-2 border-[#c5a875]"
          }
        >
          {Array.from(Array(5).keys()).map((number) => (
            <Image
              key={number}
              src={star}
              alt={"Звезда"}
              className={"h-[70%] w-auto drop-shadow pl-1"}
            />
          ))}
          <p className={"text-white text-[1.1vw] ml-4"}>
            Шанс получения 5★: {getBannerGuaranteeRules(banner.type)}
          </p>
        </div>
      </div>
      <table
        className={"w-full text-[#595252] border border-[#dac69f] text-[1.2vw]"}
      >
        <thead>
          <tr>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Тип
            </th>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Имя
            </th>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Тип
            </th>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Имя
            </th>
          </tr>
        </thead>
        <tbody>
          {fiveStarItems.map((item, index) => {
            const nextItem = fiveStarItems[index + 1];
            if (index % 2 === 0) {
              return (
                <tr key={index} className={"bg-[#f4f1ec] text-center"}>
                  <td className={"border border-[#dac69f] p-4"}>
                    {"name" in item ? "Персонаж" : "Оружие"}
                  </td>
                  <td className={"relative border border-[#dac69f] p-4"}>
                    {"name" in item ? item.name : item.title}
                    {mainItems?.some((mainItem) => item.id === mainItem.id) ? (
                      <Image
                        src={up}
                        alt={"Up!"}
                        className={"absolute top-2 right-2"}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={"border border-[#dac69f] p-4"}>
                    {"name" in nextItem ? "Персонаж" : "Оружие"}
                  </td>
                  <td className={"relative border border-[#dac69f] p-4"}>
                    {"name" in nextItem ? nextItem.name : nextItem.title}
                    {mainItems?.some(
                      (mainItem) => nextItem.id === mainItem.id,
                    ) ? (
                      <Image
                        src={up}
                        alt={"Up!"}
                        className={"absolute top-2 right-2"}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <div className={"h-[7%] flex justify-center items-center bg-[#b5a8c9]"}>
        <div
          className={
            "flex items-center pl-8 w-[99.5%] h-[90%] border-2 border-[#c5a875]"
          }
        >
          {Array.from(Array(4).keys()).map((number) => (
            <Image
              key={number}
              src={star}
              alt={"Звезда"}
              className={"h-[70%] w-auto drop-shadow pl-1"}
            />
          ))}
          <p className={"text-white text-[1.1vw] ml-4"}>
            Шанс получения 4★: {getBannerGuaranteeRules(banner.type)}
          </p>
        </div>
      </div>
      <table
        className={"w-full text-[#595252] border border-[#dac69f] text-[1.2vw]"}
      >
        <thead>
          <tr>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Тип
            </th>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Имя
            </th>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Тип
            </th>
            <th
              className={"bg-[#ede1ca] border border-[#dac69f] font-normal p-2"}
            >
              Имя
            </th>
          </tr>
        </thead>
        <tbody>
          {fourStarItems.map((item, index) => {
            const nextItem = fiveStarItems[index + 1];
            if (index % 2 === 0) {
              return (
                <tr key={index} className={"bg-[#f4f1ec] text-center"}>
                  <td className={"border border-[#dac69f] p-4"}>
                    {"name" in item ? "Персонаж" : "Оружие"}
                  </td>
                  <td className={"relative border border-[#dac69f] p-4"}>
                    {"name" in item ? item.name : item.title}
                    {mainItems?.some((mainItem) => item.id === mainItem.id) ? (
                      <Image
                        src={up}
                        alt={"Up!"}
                        className={"absolute top-2 right-2"}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className={"border border-[#dac69f] p-4"}>
                    {"name" in nextItem ? "Персонаж" : "Оружие"}
                  </td>
                  <td className={"relative border border-[#dac69f] p-4"}>
                    {"name" in nextItem ? nextItem.name : nextItem.title}
                    {mainItems?.some(
                      (mainItem) => nextItem.id === mainItem.id,
                    ) ? (
                      <Image
                        src={up}
                        alt={"Up!"}
                        className={"absolute top-2 right-2"}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
