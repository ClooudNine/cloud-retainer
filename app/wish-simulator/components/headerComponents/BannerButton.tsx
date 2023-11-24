"use client";
import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/assets/banner-button-background.webp";
import bannerButtonBackgroundActive from "@/public/wish-simulator/assets/banner-button-background-active.webp";
import { Banners } from "@/app/types/banner";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import classNames from "classnames";
import { getBannerMainItemName } from "@/app/wish-simulator/utils";

const BannerButton = ({
  banner,
  portraitUrl,
}: {
  banner: Banners;
  portraitUrl: string[];
}) => {
  const { selectedBanner, characters, weapons, switchBanner } =
    useBannerContext();

  const bannerButtonClasses = classNames(
    "relative h-2/5 w-1/4 select-none transition-all cursor-genshin hover:scale-110 sm:h-3/5 md:h-[30%] lg:h-2/5",
    {
      "scale-110": banner === selectedBanner,
    },
  );

  const portraitClasses = classNames(
    "select-none mt-[30%] h-4/5 w-auto transition-all",
    {
      "-translate-y-[10%]": banner === selectedBanner,
      "-mx-[15%] -rotate-12": banner.type === "Weapon Event Wish",
    },
  );
  return (
    <button className={bannerButtonClasses}>
      <Image
        src={
          banner === selectedBanner
            ? bannerButtonBackgroundActive
            : bannerButtonBackground
        }
        alt={"Фон кнопки выбора баннера"}
        draggable={false}
        fill
        onClick={() => switchBanner(banner, "Banner button")}
      />
      <div
        className={
          "absolute bottom-1 flex justify-center overflow-hidden w-full h-[215%] pointer-events-none"
        }
      >
        {portraitUrl.map((url, index) => (
          <Image
            key={url}
            src={url}
            alt={getBannerMainItemName(
              selectedBanner,
              characters,
              weapons,
              index,
            )}
            quality={100}
            draggable={false}
            width={200}
            height={200}
            className={portraitClasses}
          />
        ))}
      </div>
    </button>
  );
};

export default BannerButton;
