import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";
import { Banners } from "@/app/lib/banner";
import CharacterEventWish from "@/app/wish-simulator/details/components/descriptions/CharacterEventWish";
import WeaponEventWish from "@/app/wish-simulator/details/components/descriptions/WeaponEventWish";
import StandardWish from "@/app/wish-simulator/details/components/descriptions/StandardWish";
import { CSSProperties } from "react";

const getBannerMoreInfo = (
  banner: Banners,
  mainItems: Character[] | Weapon[] | null,
  featuredItems: Character[] | Weapon[] | null,
) => {
  switch (banner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      return (
        <CharacterEventWish
          banner={banner}
          mainItems={mainItems}
          featuredItems={featuredItems}
        />
      );
    case "Weapon Event Wish":
      return (
        <WeaponEventWish
          banner={banner}
          mainItems={mainItems}
          featuredItems={featuredItems}
        />
      );
    case "Standard Wish":
      return <StandardWish banner={banner} />;
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
        "absolute overflow-y-scroll genshin-scrollbar w-[81%] h-[60%] md:h-[68%] top-[30%] md:top-[21%] left-[10%]"
      }
    >
      <p className={"text-[#595252] text-[3.5vw] md:text-[1.3vw]"}>
        Подробнее о Молитвах
      </p>
      <div
        className={
          "h-[12%] md:h-[7%] flex justify-center items-center bg-[#6f778a]"
        }
      >
        <div
          className={
            "flex items-center pl-4 md:pl-8 w-[99.5%] h-[90%] border-2 border-[#757d90]"
          }
        >
          <p className={"text-white text-[3vw] md:text-[1.1vw]"}>
            {banner.type === "Standard Wish"
              ? "Нет ограничения по времени"
              : "Временное событие"}
          </p>
        </div>
      </div>
      <div
        style={{ "--palette": palette } as CSSProperties}
        className={
          "mt-2 md:mt-4 text-[#595252] text-[3vw] md:text-[1.2vw] [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic [&_i]:not-italic"
        }
      >
        {getBannerMoreInfo(banner, mainItems, featuredItems)}
      </div>
    </div>
  );
};
export default MoreInfo;
