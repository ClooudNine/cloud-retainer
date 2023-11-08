import Image from "next/image";
import arrow from "@/public/wish-simulator/assets/switch-banner-arrow.webp";
import classNames from "classnames";
import { useCallback } from "react";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";

const SwitchBannerArrow = ({ isForward }: { isForward: boolean }) => {
  const { currentBanners, selectedBanner, switchBanner } = useBannerContext();

  const SwitchBannerArrowClasses = classNames(
    "hidden sm:block sm:mx-2 md:mx-8 lg:mx-16 xl:mx-20",
    {
      "rotate-180": !isForward,
    },
  );

  const switchBannerCallback = useCallback(() => {
    const currentBannerIndex = currentBanners.indexOf(selectedBanner);
    const targetBannerIndex = isForward
      ? (currentBannerIndex + 1) % currentBanners.length
      : (currentBannerIndex - 1 + currentBanners.length) %
        currentBanners.length;
    switchBanner(currentBanners[targetBannerIndex], "Arrow button");
  }, [currentBanners, selectedBanner, isForward, switchBanner]);

  return (
    <Image
      src={arrow}
      alt={`Переключить баннер ${isForward ? "вперёд" : "назад"}`}
      onClick={switchBannerCallback}
      className={SwitchBannerArrowClasses}
    />
  );
};

export default SwitchBannerArrow;
