import Image from "next/image";
import star from "@/public/common-icons/star.webp";
import { elementToColor, Rares } from "@/app/types/common";
import { CSSProperties } from "react";
import ItemCard from "@/app/wish-simulator/details/components/ItemCard";
import { getBannerGuaranteeRules } from "@/app/wish-simulator/details/components/increasedChanceSection/IncreasedChanceSection";
import { BannerTypes } from "@/app/types/banner";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";

const IncreasedChanceList = ({
  rare,
  bannerType,
  items,
}: {
  rare: Rares;
  bannerType: BannerTypes;
  items: Character[] | Weapon[] | null;
}) => {
  return (
    <div className={`min-h-max md:h-[45%] ${rare === 4 ? "mt-2 md:mt-4" : ""}`}>
      <div
        className={`h-[20%] flex justify-center items-center ${
          rare === 5 ? "bg-[#cfb383]" : "bg-[#b5a8c9]"
        }`}
      >
        <div
          className={`flex items-center pl-2 md:pl-8 w-[99.5%] h-[90%] border-2 ${
            rare === 5 ? "border-[#c5a875]" : "border-[#ac9dc1]"
          }`}
        >
          {Array.from(Array(rare).keys()).map((number) => (
            <Image
              key={number}
              src={star}
              alt={"Звезда"}
              className={"h-[70%] w-auto drop-shadow pl-1"}
            />
          ))}
          <p className={"text-white text-[2.5vw] md:text-[1.1vw] pl-4"}>
            Шанс получения {rare}★: {getBannerGuaranteeRules(bannerType)}
          </p>
        </div>
      </div>
      <div className={"md:h-[80%] bg-[#f9f5ee] flex justify-center"}>
        <div
          className={
            "relative w-[99.5%] h-[99%] flex gap-6 md:gap-10 border border-[#e7e1d9]"
          }
        >
          {items ? (
            <>
              <div className={"pl-4 pt-2 w-[30%] md:pl-10 md:pt-4 md:w-[25%]"}>
                {items.map((item) => (
                  <p
                    style={
                      {
                        "--item-color":
                          "name" in item
                            ? elementToColor[item.element]
                            : item.rare === 5
                            ? "193, 96, 40"
                            : "161,88,225",
                      } as CSSProperties
                    }
                    key={item.title}
                    className={
                      "text-[rgb(var(--item-color))] text-[2.5vw] md:text-[1vw]"
                    }
                  >
                    {"name" in item ? item.name : item.title}
                  </p>
                ))}
              </div>
              <div className={"flex flex-wrap items-center gap-4 w-[75%]"}>
                {items.map((item) => (
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
  );
};

export default IncreasedChanceList;
