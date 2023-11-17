"use client";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import Image from "next/image";
import { CSSProperties } from "react";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import star from "@/public/wish-simulator/assets/star-for-description.webp";
import {
  bannerDescriptions,
  Banners,
  bannerSecondTitle,
  NamesOffsets,
  TextParameters,
} from "@/app/types/banner";
import SwitchBannerArrow from "@/app/wish-simulator/components/SwitchBannerArrow";
import classNames from "classnames";
import { currentGameVersion } from "@/app/types/common";

const renderCharacterBannerInfo = (
  character: Character,
  offsets: TextParameters,
) => {
  return (
    <div
      style={
        {
          "--right-offset": offsets["r"],
          "--bottom-offset": offsets["b"],
        } as CSSProperties
      }
      className={
        "absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]"
      }
    >
      <p
        className={"text-[4cqw] text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]"}
      >
        {character.name}
      </p>
      <p className={"text-[1.8cqw] mt-[3cqw] text-[#c2bd96]"}>
        {character.title}
      </p>
    </div>
  );
};
const renderWeaponBannerInfo = (
  fiveStarWeapons: Weapon[],
  fourStarWeapon: string,
  offset: NamesOffsets,
) => {
  return (
    <>
      <div
        style={
          {
            "--right-offset": offset["five_star"]["r"],
            "--bottom-offset": offset["five_star"]["b"],
            "--title-size": offset["five_star"]["fontSize"],
          } as CSSProperties
        }
        className={
          "absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]"
        }
      >
        {fiveStarWeapons.map((weapon) => (
          <p
            key={weapon.title}
            className={
              "text-[length:var(--title-size)] text-white leading-tight drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
            }
          >
            {weapon.title}
          </p>
        ))}
      </div>
      <div
        style={
          {
            "--right-offset": offset["four_star"]["r"],
            "--bottom-offset": offset["four_star"]["b"],
            "--title-size": offset["four_star"]["fontSize"],
          } as CSSProperties
        }
        className={
          "absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]"
        }
      >
        <p
          className={
            "text-white leading-tight text-[length:var(--title-size)] drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
          }
          dangerouslySetInnerHTML={{ __html: fourStarWeapon }}
        ></p>
      </div>
    </>
  );
};
const renderStandardBannerInfo = (
  titlesOnBanner: string[],
  characters: Character[],
  standardBannerParameters: NamesOffsets,
) => {
  return (
    <>
      {titlesOnBanner.map((title) => {
        const maybeCharacter = characters.find(
          (character) => character.name === title,
        );
        return (
          <div
            key={title}
            style={
              {
                "--right-offset": standardBannerParameters[title]["r"],
                "--bottom-offset": standardBannerParameters[title]["b"],
                "--name-size": standardBannerParameters[title]["fontSize"],
              } as CSSProperties
            }
            className={`absolute bottom-[var(--bottom-offset)] right-[var(--right-offset)]`}
          >
            {maybeCharacter ? (
              <>
                <pre
                  className={
                    "font-genshin text-[length:var(--name-size)] leading-tight text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
                  }
                >
                  {maybeCharacter.name}
                </pre>
                <p className={"text-[1.5cqw] mt-[2cqw] text-[#c2bd96]"}>
                  {maybeCharacter.title}
                </p>
              </>
            ) : (
              <pre
                className={
                  "font-genshin text-[length:var(--name-size)] leading-tight text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]"
                }
              >
                {title}
              </pre>
            )}
          </div>
        );
      })}
    </>
  );
};
const getMainItemsNamesAndTitles = (
  characters: Character[],
  weapons: Weapon[],
  selectedBanner: Banners,
) => {
  switch (selectedBanner.type) {
    case "Character Event Wish":
    case "Character Event Wish-2":
    case "Novice Wish":
      const mainCharacter = characters.find(
        (character) => character.id === selectedBanner.main_character,
      ) as Character;
      const characterNameOffset =
        selectedBanner.text_parameters as TextParameters;
      return renderCharacterBannerInfo(mainCharacter, characterNameOffset);
    case "Weapon Event Wish":
      const mainWeaponsId = [
        selectedBanner.first_main_weapon,
        selectedBanner.second_main_weapon,
      ];
      const mainFiveStarWeapons = mainWeaponsId.map(
        (weaponId) =>
          weapons.find((weapon) => weapon.id === weaponId) as Weapon,
      );
      const weaponsTitlesOffset = selectedBanner.name_offsets;
      return renderWeaponBannerInfo(
        mainFiveStarWeapons,
        selectedBanner.four_star_weapon_on_banner,
        weaponsTitlesOffset,
      );
    case "Standard Wish":
      const titlesOnBanner = Object.keys(selectedBanner.text_parameters);
      return renderStandardBannerInfo(
        titlesOnBanner,
        characters,
        selectedBanner.text_parameters,
      );
  }
};
const isNonStandardOffset = (currentBanner: Banners) => {
  return (
    currentBanner.type !== "Standard Wish" ||
    (currentBanner.type === "Standard Wish" && !currentBanner.is_top_offset)
  );
};
const Banner = () => {
  const {
    characters,
    weapons,
    currentBanners,
    currentBannersPreviewsUrl,
    selectedBanner,
  } = useBannerContext();

  const bannerTypeClasses = classNames(
    "absolute text-[2cqw] -left-1 text-white bg-[var(--palette-no-opacity)] rounded-l-full rounded-br-[19999px] pl-3 pr-5 py-0.5",
    {
      "top-[8%]":
        selectedBanner.type === "Standard Wish" && selectedBanner.is_top_offset,
      "-top-1": isNonStandardOffset(selectedBanner),
    },
  );
  const bannerTitleClasses = classNames(
    "absolute text-[#595957] text-[5cqw] leading-tight left-[5%] [&_em]:text-[var(--palette-no-opacity)] [&_em]:not-italic",
    {
      "top-[15%]":
        selectedBanner.type === "Standard Wish" && selectedBanner.is_top_offset,
      "top-[8%]": isNonStandardOffset(selectedBanner),
    },
  );
  const bannerDescriptionClasses = classNames(
    "absolute overflow-y-scroll w-1/2 pl-[5%] h-2/5 scrollbar-for-banner sm:w-[40%]",
    {
      "bottom-[16%]":
        selectedBanner.type === "Standard Wish" && selectedBanner.is_top_offset,
      "bottom-[23%]": isNonStandardOffset(selectedBanner),
    },
  );

  const rulesClasses = classNames("flex items-center gap-1 mt-1 md:mt-2", {
    "bg-[var(--palette-opacity)]": currentGameVersion !== 1,
    "bg-[rgba(65,163,162,0.8)]":
      currentGameVersion === 1 && selectedBanner.type === "Standard Wish",
    "bg-[rgba(230,98,106,255)]": selectedBanner.type === "Novice Wish",
  });
  return (
    <section
      className={
        "flex font-genshin items-center justify-center sm:justify-between z-10"
      }
    >
      <SwitchBannerArrow isForward={false} />
      <div
        key={selectedBanner.type}
        className={
          "relative w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] transition-all animate-banner-preview-appearance"
        }
        style={
          {
            "--palette-opacity": `rgba(${selectedBanner.color_palette}, 0.8)`,
            "--palette-no-opacity": `rgba(${selectedBanner.color_palette}, 1)`,
            containerType: "inline-size",
          } as CSSProperties
        }
      >
        <Image
          src={
            currentBannersPreviewsUrl[currentBanners.indexOf(selectedBanner)]
          }
          alt={"Картинка баннера"}
          draggable={false}
          width={1200}
          height={600}
          quality={100}
          className={"rounded-2xl h-auto w-full select-none"}
        />
        <div className={bannerTypeClasses}>{selectedBanner.type}</div>
        <p
          className={bannerTitleClasses}
          dangerouslySetInnerHTML={{ __html: selectedBanner.title }}
        ></p>
        <div dir={"rtl"} className={bannerDescriptionClasses}>
          <p dir={"ltr"} className={"text-[#595957] text-[2.5cqw]"}>
            {bannerSecondTitle[selectedBanner.type]}
          </p>
          <div dir={"ltr"} className={rulesClasses}>
            <Image
              src={star}
              quality={100}
              width={22}
              alt={"Звезда"}
              className={"pl-1"}
            />
            <p className={"text-white text-[1.8cqw]"}>
              Every 10 wishes is guaranteed to include at least one 4-star or
              higher item.
            </p>
          </div>
          <p
            dir={"ltr"}
            className={
              "mt-1 text-[#595957] text-[1.7cqw] drop-shadow-[0_0_2px_rgba(255,255,255,1)] md:mt-2"
            }
          >
            {bannerDescriptions[selectedBanner.type]}
          </p>
        </div>
        {getMainItemsNamesAndTitles(characters, weapons, selectedBanner)}
      </div>
      <SwitchBannerArrow isForward={true} />
    </section>
  );
};
export default Banner;
