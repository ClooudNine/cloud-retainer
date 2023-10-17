"use client";
import BannerButton from "@/app/wish-simulator/components/headerComponents/BannerButton";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import classNames from "classnames";
const BannerList = () => {
  const { banners, bannersPortraits } = useBannerContext();
  const bannerListClasses = classNames(
    `col-span-full row-start-2 flex items-center mx-2 gap-1 sm:mx-12 sm:gap-3 md:row-start-1 md:mx-0 md:col-start-3 md:col-end-9 xl:gap-4 xl:col-start-5`,
  );
  return (
    <div className={bannerListClasses}>
      {banners.map((banner, index) => {
        return (
          <BannerButton
            key={banner.type + "-" + banner.id}
            banner={banner}
            portraitUrl={bannersPortraits[index]}
          />
        );
      })}
    </div>
  );
};

export default BannerList;
