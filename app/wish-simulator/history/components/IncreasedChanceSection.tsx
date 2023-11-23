import Image from "next/image";
import star from "@/public/common-icons/star.webp";
import { BannerTypes } from "@/app/types/banner";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { Elements } from "@/app/types/common";
import { CSSProperties } from "react";

const getBannerGuaranteeRules = (bannerType: BannerTypes) => {
  if (bannerType === "Weapon Event Wish") {
    return "75,000%";
  }
  return "50,000%";
};
const IncreasedChanceSection = ({
  bannerType,
  mainItems,
}: {
  bannerType: BannerTypes;
  mainItems: Character[] | Weapon[];
}) => {
  const elementToColor: { [key in Elements]: string } = {
    Anemo: "#70c2a7",
    Dendro: "#6b9849",
    Cryo: "#6bb1c5",
    Electro: "#6b59a8",
    Pyro: "#ea7a39",
    Geo: "#f2b71f",
    Hydro: "#5fc1ef",
  };
  return (
    <div className={"absolute w-[81%] h-[68%] top-[23%] left-[10%]"}>
      <p className={"text-[#595252] text-[1.3vw]"}>
        Вероятность получения следующих предметов повышена!
      </p>
      <div className={"h-[40%]"}>
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
          <div className={"w-[99.5%] h-[99%] border border-[#e7e1d9]"}>
            {mainItems.map((item) => (
              <p
                style={
                  {
                    "--item-color":
                      "name" in item ? elementToColor[item.element] : "#c16028",
                  } as CSSProperties
                }
                key={item.title}
                className={"text-[var(--item-color)] text-[1vw] ml-10 mt-4"}
              >
                {"name" in item ? item.name : item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncreasedChanceSection;
