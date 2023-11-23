import Image from "next/image";
import fiveStarItemBackground from "@/public/wish-simulator/items-backgrounds-by-rarity/background-item-5-star.webp";
import fourStarItemBackground from "@/public/wish-simulator/items-backgrounds-by-rarity/background-item-4-star.webp";
import star from "@/public/common-icons/star.webp";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SupabaseClient } from "@supabase/supabase-js";

const getItemPortrait = (
  supabase: SupabaseClient,
  item: Character | Weapon,
) => {
  if ("name" in item) {
    return supabase.storage.from("characters profiles").getPublicUrl(item.name)
      .data.publicUrl;
  } else {
    return supabase.storage.from("weapons portraits").getPublicUrl(item.title)
      .data.publicUrl;
  }
};
export const dynamic = "force-dynamic";
const ItemCard = ({ item }: { item: Character | Weapon }) => {
  const supabase = createServerComponentClient({ cookies });
  return (
    <div className={"relative h-[80%] w-[25%] bg-white drop-shadow rounded-md"}>
      <Image
        src={item.rare === 5 ? fiveStarItemBackground : fourStarItemBackground}
        alt={`Фон предмета ${
          item.rare === 5 ? "пятизвёздочной" : "четырёхзвёздочной"
        } редкости`}
        className={"h-[80%] w-auto px-0.5 pt-0.5 rounded-md rounded-br-3xl"}
      />
      {"name" in item ? (
        ""
      ) : (
        <div
          className={
            "absolute w-[15%] text-center rounded top-1 left-1 bg-[rgba(0,0,0,0.4)] text-[#cfcfcf]"
          }
        >
          1
        </div>
      )}
      <Image
        src={getItemPortrait(supabase, item) + ".webp"}
        alt={`Портрет ${
          "name" in item ? `персонажа ${item.name}` : `оружия ${item.title}`
        }`}
        width={130}
        height={130}
        quality={100}
        className={"w-full h-auto absolute top-0"}
      />
      <div className={"w-full flex justify-center -mt-4"}>
        {Array.from(Array(5).keys()).map((number) => (
          <Image
            key={number}
            src={star}
            alt={"Звезда"}
            quality={100}
            className={"z-10 w-[17%] drop-shadow"}
          />
        ))}
      </div>
      <p className={"truncate text-[1vw] text-center text-[#495366] -mt-1"}>
        Ур. 1
      </p>
    </div>
  );
};

export default ItemCard;
