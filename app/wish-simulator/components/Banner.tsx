"use client";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import Image from "next/image";
import { CSSProperties } from "react";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import star from "@/public/wish-simulator/star-for-description.png";
import { bannerDescriptions, bannerSecondTitle } from "@/app/types/banner";
import SwitchBannerArrow from "@/app/wish-simulator/components/SwitchBannerArrow";
const Banner = () => {
  const { currentBanner, currentBannerPreviewUrl, currentBannerMainItem } =
    useBannerContext();

  return (
    <section
      className={"flex items-center justify-center sm:justify-between z-10"}
    >
      <SwitchBannerArrow isForward={false} />
      <div
        className={
          "relative w-[95%] md:w-[90%] lg:w-[70%] xl:w-[60%] 2xl:w-[55%]"
        }
        style={
          {
            "--palette-opacity": `rgba(${currentBanner.color_palette}, 0.8)`,
            "--palette--no-opacity": `rgba(${currentBanner.color_palette}, 1)`,
            "--right-offset": currentBanner.name_offsets.r,
            "--bottom-offset": currentBanner.name_offsets.b,
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
        <div
          className={
            "absolute text-[2cqw] -top-1 -left-1 font-genshin text-white bg-[var(--palette--no-opacity)] rounded-l-full rounded-br-[19999px] pl-3 pr-5 py-0.5"
          }
        >
          {currentBanner.type}
        </div>
        <p
          className={
            "absolute drop-shadow-[0_0_2px_rgba(255,255,255,1)] text-[#595957] text-[5cqw] leading-tight font-genshin top-[8%] left-[5%] [&_em]:text-[var(--palette--no-opacity)] [&_em]:not-italic"
          }
          dangerouslySetInnerHTML={{ __html: currentBanner.title }}
        ></p>
        <div
          dir={"rtl"}
          className={
            "absolute overflow-y-scroll bottom-[23%] w-1/2 pl-[5%] h-2/5 scrollbar-for-banner sm:w-[40%]"
          }
        >
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
        <div
          className={
            "absolute font-genshin text-white leading-tight drop-shadow-[0_0_2px_rgba(0,0,0,1)] text-[4cqw] bottom-[var(--bottom-offset)] right-[var(--right-offset)]"
          }
        >
          {currentBanner.type !== "Weapon Event Wish"
            ? (currentBannerMainItem as Character).name
            : (currentBannerMainItem as Weapon[]).map((weapon) => (
                <p key={weapon.title}>{weapon.title}</p>
              ))}
        </div>
      </div>
      <SwitchBannerArrow isForward={true} />
    </section>
  );
};
export default Banner;
