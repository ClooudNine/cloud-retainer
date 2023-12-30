import Image from "next/image";
import fiveStarItemBackground from "@/public/common/items-backgrounds-by-rarity/background-item-5-star.webp";
import fourStarItemBackground from "@/public/common/items-backgrounds-by-rarity/background-item-4-star.webp";
import star from "@/public/common/star.webp";

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
    <div
      className={
        "relative h-[70px] md:h-[80%] w-[30%] md:w-[15%] bg-white drop-shadow rounded-md"
      }
    >
      <div
        className={
          "relative h-[80%] px-0.5 pt-0.5 rounded-md rounded-br-2xl md:rounded-br-3xl overflow-hidden"
        }
      >
        <Image
          src={
            item.rare === 5 ? fiveStarItemBackground : fourStarItemBackground
          }
          alt={`Фон предмета ${
            item.rare === 5 ? "пятизвёздочной" : "четырёхзвёздочной"
          } редкости`}
          fill
        />
        {"name" in item ? (
          <Image
            src={`/common-icons/elements/${item.element}.svg`}
            alt={item.element}
            width={30}
            height={30}
            className={
              "z-10 w-[30%] md:w-[22%] absolute top-0.5 left-0.5 md:top-1 md:left-1 "
            }
          />
        ) : (
          <div
            className={
              "absolute w-[20%] text-[2vw] md:text-[1vw] text-center rounded top-1 left-1 bg-[rgba(0,0,0,0.4)] text-[#cfcfcf]"
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
          className={"w-full h-auto absolute bottom-0"}
        />
      </div>
      <div className={"w-full flex justify-center -mt-2 md:-mt-4"}>
        {Array.from(Array(item.rare).keys()).map((number) => (
          <Image
            key={number}
            src={star}
            alt={"Звезда"}
            quality={100}
            className={"z-10 w-[17%] drop-shadow"}
          />
        ))}
      </div>
      <p
        className={
          "truncate text-[2.5vw] md:text-[1vw] text-center text-[#495366]"
        }
      >
        Ур. 1
      </p>
    </div>
  );
};

export default ItemCard;
