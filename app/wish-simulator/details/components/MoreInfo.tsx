import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { Banners } from "@/app/types/banner";
import CharacterEventWish from "@/app/wish-simulator/details/components/descriptions/CharacterEventWish";
import WeaponEventWish from "@/app/wish-simulator/details/components/descriptions/WeaponEventWish";
import StandardWish from "@/app/wish-simulator/details/components/descriptions/StandardWish";

const getBannerMoreInfo = (
  banner: Banners,
  mainItems: Character[] | Weapon[] | null,
  featuredItems: Character[] | Weapon[] | null,
  palette: string,
) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      return (
        <CharacterEventWish
          banner={banner}
          mainItems={mainItems}
          featuredItems={featuredItems}
          palette={palette}
        />
      );
    case "Weapon Event Wish":
      return (
        <WeaponEventWish
          banner={banner}
          mainItems={mainItems}
          featuredItems={featuredItems}
          palette={palette}
        />
      );
    case "Standard Wish":
      return (
        <StandardWish
          banner={banner}
          mainItems={mainItems}
          featuredItems={featuredItems}
          palette={palette}
        />
      );
  }
};
const MoreInfo = ({
  banner,
  mainItems,
  featuredItems,
  palette,
}: {
  banner: Banners;
  mainItems: Character[] | Weapon[] | null;
  featuredItems: Character[] | Weapon[] | null;
  palette: string;
}) => {
  return (
    <div
      className={
        "absolute overflow-y-scroll scrollbar-for-epitomized-path w-[81%] h-[68%] top-[23%] left-[10%]"
      }
    >
      <p className={"text-[#595252] text-[1.3vw]"}>Подробнее о Молитвах</p>
      <div className={"h-[7%] flex justify-center items-center bg-[#6f778a]"}>
        <div
          className={
            "flex items-center pl-8 w-[99.5%] h-[90%] border-2 border-[#757d90]"
          }
        >
          <p className={"text-white text-[1.1vw]"}>
            {banner.type === "Standard Wish"
              ? "Нет ограничения по времени"
              : "Временное событие"}
          </p>
        </div>
      </div>
      {getBannerMoreInfo(banner, mainItems, featuredItems, palette)}
    </div>
  );
};
export default MoreInfo;
