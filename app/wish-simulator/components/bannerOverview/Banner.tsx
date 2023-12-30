"use client";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import Image from "next/image";
import { CSSProperties } from "react";
import star from "@/public/wish-simulator/assets/star-for-description.webp";
import { bannerDescriptions, Banners, bannerSecondTitle } from "@/lib/banners";
import SwitchBannerArrow from "@/app/wish-simulator/components/bannerOverview/SwitchBannerArrow";
import { currentGameVersion } from "@/lib/common";
import { getBannerColor, getPreviewUrl } from "@/app/wish-simulator/utils";
import EpitomizedPathButton from "@/app/wish-simulator/components/epitomizedPathSystem/EpitomizedPathButton";
import clsx from "clsx";
import {
  Character,
  CharacterBanner,
  StandardBanner,
  Weapon,
  WeaponBanner,
} from "@/lib/db/schema";

const renderCharacterName = (
  character: Character,
  offsets: { r: string; b: string },
) => {
  return (
    <div
      style={
        {
          "--right-offset": offsets.r,
          "--bottom-offset": offsets.b,
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
  offset: {
    fiveStar: { r: string; b: string; fontSize: string };
    [key: string]: { r: string; b: string; fontSize: string };
  },
) => {
  const fourStarWeaponText = Object.values(offset)[1];
  return (
    <>
      <div
        style={
          {
            "--right-offset": offset.fiveStar.r,
            "--bottom-offset": offset.fiveStar.b,
            "--title-size": offset.fiveStar.fontSize,
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
            "--right-offset": fourStarWeaponText.r,
            "--bottom-offset": fourStarWeaponText.b,
            "--title-size": fourStarWeaponText.fontSize,
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
          dangerouslySetInnerHTML={{ __html: Object.keys(offset)[1] }}
        ></p>
      </div>
    </>
  );
};
const renderStandardBannerInfo = (
  titlesOnBanner: string[],
  characters: Character[],
  standardBannerParameters: {
    [key: string]: { r: string; b: string; fontSize: string };
  },
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
const renderBannerInfo = (
  characters: Character[],
  weapons: Weapon[],
  selectedBanner: Banners,
) => {
  if (
    selectedBanner.type === "Character Event Wish" ||
    selectedBanner.type === "Character Event Wish-2"
  ) {
    const mainCharacter = characters.find(
      (character) =>
        character.id === (selectedBanner as CharacterBanner).mainCharacterId,
    ) as Character;
    return renderCharacterName(
      mainCharacter,
      (selectedBanner as CharacterBanner).textParameters,
    );
  } else if (selectedBanner.type === "Weapon Event Wish") {
    const mainWeaponsId = [
      (selectedBanner as WeaponBanner).firstMainWeaponId,
      (selectedBanner as WeaponBanner).secondMainWeaponId,
    ];
    const mainFiveStarWeapons = mainWeaponsId.map(
      (weaponId) => weapons.find((weapon) => weapon.id === weaponId) as Weapon,
    );
    return renderWeaponBannerInfo(
      mainFiveStarWeapons,
      (selectedBanner as WeaponBanner).textParameters,
    );
  } else {
    const titlesOnBanner = Object.keys(selectedBanner.textParameters);
    return renderStandardBannerInfo(
      titlesOnBanner,
      characters,
      (selectedBanner as StandardBanner).textParameters,
    );
  }
};
const Banner = () => {
  const { characters, weapons, selectedBanner } = useBannerContext();
  const rulesClasses = clsx("flex items-center gap-1 mt-1 md:mt-2", {
    "bg-[var(--palette-opacity)]": currentGameVersion !== 1,
    "bg-[rgba(65,163,162,0.8)]":
      currentGameVersion === 1 && selectedBanner.type === "Standard Wish",
    "bg-[rgba(230,98,106,1)]": selectedBanner.type === "Novice Wish",
  });
  return (
    <section
      className={
        "z-20 flex font-genshin items-center justify-center sm:justify-between"
      }
    >
      <SwitchBannerArrow isForward={false} />
      {selectedBanner.type === "Weapon Event Wish" && (
        <EpitomizedPathButton weaponBanner={selectedBanner as WeaponBanner} />
      )}
      <div
        key={selectedBanner.type}
        className={
          "relative w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%] transition-all animate-banner-preview-appearance"
        }
        style={
          {
            "--palette-opacity": `rgba(${getBannerColor(
              selectedBanner,
              characters,
            )}, 0.8)`,
            "--palette-no-opacity": `rgba(${getBannerColor(
              selectedBanner,
              characters,
            )}, 1)`,
            containerType: "inline-size",
          } as CSSProperties
        }
      >
        <Image
          src={`/wish-simulator/banners/${getPreviewUrl(selectedBanner)}.webp`}
          alt={"Картинка баннера"}
          draggable={false}
          width={1200}
          height={600}
          quality={100}
          className={"rounded-2xl w-full h-auto select-none"}
        />
        <div
          className={`absolute text-[2cqw] ${
            selectedBanner.type === "Standard Wish" && currentGameVersion > 1
              ? "top-[8%]"
              : "-top-1"
          } -left-1 text-white bg-[var(--palette-no-opacity)] rounded-l-full rounded-br-[19999px] pl-3 pr-5 py-0.5`}
        >
          {selectedBanner.type}
        </div>
        <p
          className={`absolute ${
            selectedBanner.type === "Standard Wish" && currentGameVersion > 1
              ? "top-[16%]"
              : "top-[8%]"
          } text-[#595957] text-[5cqw] leading-tight left-[5%] [&_em]:text-[var(--palette-no-opacity)] [&_em]:not-italic`}
          dangerouslySetInnerHTML={{ __html: selectedBanner.title }}
        ></p>
        <div
          dir={"rtl"}
          className={`absolute ${
            selectedBanner.type === "Standard Wish" && currentGameVersion > 1
              ? "bottom-[18%]"
              : "bottom-[23%]"
          } overflow-y-scroll w-1/2 pl-[5%] h-2/5 scrollbar-for-banner sm:w-[40%]`}
        >
          <p dir={"ltr"} className={"text-[#595957] text-[2.5cqw]"}>
            {bannerSecondTitle[selectedBanner.type]}
          </p>
          <div dir={"ltr"} className={rulesClasses}>
            <Image
              src={star}
              quality={100}
              width={22}
              alt={"Звезда"}
              className={"w-4 pl-1 lg:w-6"}
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
        {renderBannerInfo(characters, weapons, selectedBanner)}
      </div>
      <SwitchBannerArrow isForward={true} />
    </section>
  );
};
export default Banner;
