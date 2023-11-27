import Image from "next/image";
import arrow from "@/public/wish-simulator/assets/switch-banner-arrow.webp";
import classNames from "classnames";
import { useCallback } from "react";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import { playSfxEffect } from "@/app/wish-simulator/utils";

const SwitchBannerArrow = ({ isForward }: { isForward: boolean }) => {
  const { currentBanners, selectedBanner, switchBanner } = useBannerContext();
  console.count("arrow rerender");
  const switchBannerArrowClasses = classNames(
    "hidden sm:block sm:mx-2 md:mx-8 lg:mx-16 xl:mx-20",
    {
      "rotate-180": !isForward,
    },
  );
  const handleSwitchBanner = useCallback(() => {
    const currentBannerIndex = currentBanners.indexOf(selectedBanner);
    const targetBannerIndex = isForward
      ? (currentBannerIndex + 1) % currentBanners.length
      : (currentBannerIndex - 1 + currentBanners.length) %
        currentBanners.length;
    playSfxEffect("/sounds/click-on-arrow.mp3");
    switchBanner(currentBanners[targetBannerIndex]);
  }, [currentBanners, isForward, selectedBanner, switchBanner]);
  return (
    <Image
      src={arrow}
      alt={`Переключить баннер ${isForward ? "вперёд" : "назад"}`}
      onClick={handleSwitchBanner}
      className={switchBannerArrowClasses}
    />
  );
};

export default SwitchBannerArrow;
