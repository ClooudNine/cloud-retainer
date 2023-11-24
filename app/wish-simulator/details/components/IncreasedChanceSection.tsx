import Image from "next/image";
import star from "@/public/common-icons/star.webp";
import { BannerTypes } from "@/app/types/banner";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { elementToColor } from "@/app/types/common";
import { CSSProperties } from "react";
import ItemCard from "@/app/wish-simulator/details/components/ItemCard";

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
    <div className={"absolute w-[81%] h-[68%] top-[23%] left-[10%]"}>
      <p className={"text-[#595252] text-[1.3vw]"}>
        Вероятность получения следующих предметов повышена!
      </p>
      <div className={"h-[37%]"}>
        <div
          className={"h-[20%] flex justify-center items-center bg-[#cfb383]"}
        >
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
              Шанс получения 5★: {getBannerGuaranteeRules(bannerType)}
            </p>
          </div>
        </div>
        <div className={"h-full bg-[#f9f5ee] flex justify-center"}>
          <div
            className={
              "relative w-[99.5%] h-[99%] flex gap-10 border border-[#e7e1d9]"
            }
          >
            {mainItems ? (
              <>
                <div className={"pl-10 pt-4 w-[25%]"}>
                  {mainItems.map((item) => (
                    <p
                      style={
                        {
                          "--item-color":
                            "name" in item
                              ? elementToColor[item.element]
                              : "193, 96, 40",
                        } as CSSProperties
                      }
                      key={item.title}
                      className={"text-[rgb(var(--item-color))] text-[1vw]"}
                    >
                      {"name" in item ? item.name : item.title}
                    </p>
                  ))}
                </div>
                <div className={"flex items-center gap-4 h-full w-[75%]"}>
                  {mainItems.map((item) => (
                    <ItemCard key={item.title} item={item} />
                  ))}
                </div>
              </>
            ) : (
              <p>Ошибка загрузки...</p>
            )}
          </div>
        </div>
      </div>
      <div className={"h-[37%] mt-12"}>
        <div
          className={"h-[20%] flex justify-center items-center bg-[#b5a8c9]"}
        >
          <div
            className={
              "flex items-center pl-8 w-[99.5%] h-[90%] border-2 border-[#ac9dc1]"
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
              Шанс получения 4★: {getBannerGuaranteeRules(bannerType)}
            </p>
          </div>
        </div>
        <div className={"h-full bg-[#f9f5ee] flex justify-center"}>
          <div
            className={
              "relative w-[99.5%] h-[99%] flex gap-10 border border-[#e7e1d9]"
            }
          >
            {featuredItems ? (
              <>
                <div className={"pl-10 pt-4 w-[25%]"}>
                  {featuredItems.map((item) => (
                    <p
                      style={
                        {
                          "--item-color":
                            "name" in item
                              ? elementToColor[item.element]
                              : "rgb(162, 86, 225)",
                        } as CSSProperties
                      }
                      key={item.title}
                      className={"text-[rgb(var(--item-color))] text-[1vw]"}
                    >
                      {"name" in item ? item.name : item.title}
                    </p>
                  ))}
                </div>
                <div className={"flex items-center gap-4 h-full w-[75%]"}>
                  {featuredItems.map((item) => (
                    <ItemCard key={item.title} item={item} />
                  ))}
                </div>
              </>
            ) : (
              <p>Ошибка загрузки...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncreasedChanceSection;
