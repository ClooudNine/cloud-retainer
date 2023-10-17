import Image from "next/image";
import arrow from "@/public/wish-simulator/switch-banner-arrow.png";
import classNames from "classnames";
import { useCallback } from "react";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
const SwitchBannerArrow = ({ isForward }: { isForward: boolean }) => {
  const { banners, currentBanner, switchBanner } = useBannerContext();

  const SwitchBannerArrowClasses = classNames(
    "hidden sm:block sm:mx-2 md:mx-8 lg:mx-16 xl:mx-20",
    {
      "rotate-180": !isForward,
    },
  );

  const switchBannerCallback = useCallback(() => {
    const currentBannerIndex = banners.indexOf(currentBanner);
    if (isForward) {
      if (currentBannerIndex !== banners.length - 1) {
        switchBanner(banners[currentBannerIndex + 1], "Arrow button");
      } else {
        switchBanner(banners[0], "Arrow button");
      }
    } else {
      if (currentBannerIndex !== 0) {
        switchBanner(banners[currentBannerIndex - 1], "Arrow button");
      } else {
        switchBanner(banners[banners.length - 1], "Arrow button");
      }
    }
  }, [banners, currentBanner, isForward, switchBanner]);

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
