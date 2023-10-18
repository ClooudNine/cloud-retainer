"use client";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import Image from "next/image";
import { CSSProperties } from "react";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import star from "@/public/wish-simulator/star-for-description.png";
import {
  bannerDescriptions,
  bannerSecondTitle,
  CharacterBanner,
  NamesOffsetsStandardBanners,
  TextParameters,
  WeaponBanner,
} from "@/app/types/banner";
import SwitchBannerArrow from "@/app/wish-simulator/components/SwitchBannerArrow";
import classNames from "classnames";
import { currentStandardBannerPreview } from "@/app/types/common";
const getMainItemsNameAndTitles = (
  currentBanner: CharacterBanner | WeaponBanner,
  bannerMainItems: Character | Weapon[],
) => {
  switch (currentBanner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
      const mainCharacter = bannerMainItems as Character;
      return (
        <div
          style={
            {
              "--right-offset": (currentBanner.name_offsets as TextParameters)[
                "r"
              ],
              "--bottom-offset": (currentBanner.name_offsets as TextParameters)[
                "b"
              ],
            } as CSSProperties
          }
          className={
            "absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]"
          }
        >
          <p
            className={
              "font-genshin text-[4cqw] text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
            }
          >
            {mainCharacter.name}
          </p>
          <p className={"font-genshin text-[1.8cqw] mt-[3cqw] text-[#c2bd96]"}>
            {mainCharacter.title}
          </p>
        </div>
      );
    case "Weapon Event Wish":
      const mainWeapons = bannerMainItems as Weapon[];
      return (
        <div
          style={
            {
              "--right-offset": (currentBanner.name_offsets as TextParameters)[
                "r"
              ],
              "--bottom-offset": (currentBanner.name_offsets as TextParameters)[
                "b"
              ],
            } as CSSProperties
          }
          className={
            "absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]"
          }
        >
          {mainWeapons.map((weapon) => (
            <p
              key={weapon.title}
              className={
                "font-genshin text-[3cqw] text-white leading-tight drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
              }
            >
              {weapon.title}
            </p>
          ))}
        </div>
      );
    case "Standard Wish":
      const standardBannerOffsets = (
        currentBanner.name_offsets as NamesOffsetsStandardBanners
      )[currentStandardBannerPreview];
      const characterNames = Object.keys(standardBannerOffsets);
      return (
        <>
          {characterNames.map((characterName) => (
            <div
              key={characterName}
              style={
                {
                  "--right-offset": standardBannerOffsets[characterName]["r"],
                  "--bottom-offset": standardBannerOffsets[characterName]["b"],
                  fontSize: standardBannerOffsets[characterName]["fontSize"],
                } as CSSProperties
              }
              className={`absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]`}
            >
              <pre
                className={
                  "font-genshin leading-tight text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
                }
              >
                {characterName}
              </pre>
            </div>
          ))}
        </>
      );
  }
};
const Banner = () => {
  const {
    currentBanner,
    currentBannerPreviewUrl,
    currentBannerMainItem,
    isAnimate,
  } = useBannerContext();
  const bannerContainerClasses = classNames(
    "relative w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] transition-all duration-700",
    {
      "duration-0 opacity-0 translate-x-10": isAnimate,
    },
  );
  const bannerTypeClasses = classNames(
    "absolute text-[2cqw] -top-1 -left-1 font-genshin text-white bg-[var(--palette--no-opacity)] rounded-l-full rounded-br-[19999px] pl-3 pr-5 py-0.5",
    {
      "top-[8%]":
        currentBanner.type === "Standard Wish" &&
        currentStandardBannerPreview === 1.1,
    },
  );
  const bannerTitleClasses = classNames(
    "absolute drop-shadow-[0_0_2px_rgba(255,255,255,1)] text-[#595957] text-[5cqw] leading-tight font-genshin top-[8%] left-[5%] [&_em]:text-[var(--palette--no-opacity)] [&_em]:not-italic",
    {
      "top-[16%]":
        currentBanner.type === "Standard Wish" &&
        currentStandardBannerPreview === 1.1,
    },
  );
  const bannerDescriptionClasses = classNames(
    "absolute overflow-y-scroll bottom-[23%] w-1/2 pl-[5%] h-2/5 scrollbar-for-banner sm:w-[40%]",
    {
      "bottom-[15%]":
        currentBanner.type === "Standard Wish" &&
        currentStandardBannerPreview === 1.1,
    },
  );
  return (
    <section
      className={"flex items-center justify-center sm:justify-between z-10"}
    >
      <SwitchBannerArrow isForward={false} />
      <div
        className={bannerContainerClasses}
        style={
          {
            "--palette-opacity": `rgba(${currentBanner.color_palette}, 0.8)`,
            "--palette--no-opacity": `rgba(${currentBanner.color_palette}, 1)`,
            containerType: "inline-size",
          } as CSSProperties
        }
      >
        <Image
          src={currentBannerPreviewUrl}
          alt={"Картинка баннера"}
          draggable={false}
          width={1200}
          height={600}
          quality={100}
          className={"rounded-2xl w-full h-auto select-none"}
        />
        <div className={bannerTypeClasses}>{currentBanner.type}</div>
        <p
          className={bannerTitleClasses}
          dangerouslySetInnerHTML={{ __html: currentBanner.title }}
        ></p>
        <div dir={"rtl"} className={bannerDescriptionClasses}>
          <p
            dir={"ltr"}
            className={"text-[#595957] text-[2.5cqw] font-genshin"}
          >
            {bannerSecondTitle[currentBanner.type]}
          </p>
          <div
            dir={"ltr"}
            className={
              "flex items-center gap-1 mt-1 bg-[var(--palette-opacity)] h-min md:mt-2"
            }
          >
            <Image
              src={star}
              quality={100}
              width={32}
              alt={"Звезда"}
              className={"w-5 h-auto pl-1"}
            />
            <p className={"font-genshin text-white text-[1.8cqw]"}>
              Every 10 wishes is guaranteed to include at least one 4-star or
              higher item.
            </p>
          </div>
          <p
            dir={"ltr"}
            className={
              "font-genshin mt-1 text-[#595957] text-[1.7cqw] drop-shadow-[0_0_2px_rgba(255,255,255,1)] md:mt-2"
            }
          >
            {bannerDescriptions[currentBanner.type]}
          </p>
        </div>
        {getMainItemsNameAndTitles(currentBanner, currentBannerMainItem)}
      </div>
      <SwitchBannerArrow isForward={true} />
    </section>
  );
};
export default Banner;
