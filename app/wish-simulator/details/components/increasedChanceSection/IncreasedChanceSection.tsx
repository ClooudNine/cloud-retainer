import { BannerTypes } from "@/app/lib/banner";
import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";
import IncreasedChanceList from "@/app/wish-simulator/details/components/increasedChanceSection/IncreasedChanceList";

export const getBannerGuaranteeRules = (bannerType: BannerTypes) => {
  if (bannerType === "Weapon Event Wish") {
    return "75,000%";
  }
  return "50,000%";
};
const IncreasedChanceSection = ({
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
        "absolute w-[81%] h-[60%] md:h-[68%] top-[30%] genshin-scrollbar overflow-y-scroll pr-2 md:pr-0 md:overflow-auto md:top-[21%] left-[10%]"
      }
    >
      <p className={"text-[#595252] text-[2.5vw] md:text-[1.3vw]"}>
        Вероятность получения следующих предметов повышена!
      </p>
      <IncreasedChanceList rare={5} bannerType={bannerType} items={mainItems} />
      <IncreasedChanceList
        rare={4}
        bannerType={bannerType}
        items={featuredItems}
      />
    </div>
  );
};
export default IncreasedChanceSection;
