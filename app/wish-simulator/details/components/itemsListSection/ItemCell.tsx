import Image from "next/image";
import up from "@/public/wish-simulator/assets/up-icon.webp";
import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";
import { BannerTypes } from "@/app/lib/banner";

const ItemCell = ({
  item,
  mainItems,
  bannerType,
}: {
  item: Character | Weapon;
  mainItems?: Character[] | Weapon[] | null;
  bannerType: BannerTypes;
}) => {
  return (
    <>
      <td className={"border border-[#dac69f] p-2 md:p-4"}>
        {"name" in item ? "Персонаж" : "Оружие"}
      </td>
      <td className={"relative border border-[#dac69f] p-4"}>
        {"name" in item ? item.name : item.title}
        {mainItems?.some((mainItem) => {
          const isTypeCheck =
            bannerType !== "Weapon Event Wish"
              ? "name" in item
              : "type" in item;
          return item.id === mainItem.id && isTypeCheck;
        }) ? (
          <Image
            src={up}
            alt={"Up!"}
            className={"w-[9%] absolute top-2 right-2"}
          />
        ) : (
          ""
        )}
      </td>
    </>
  );
};

export default ItemCell;
