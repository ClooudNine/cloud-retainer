"use client";
import NavigationButton from "@/app/wish-simulator/details/components/NavigationButton";
import { BannerTypes } from "@/app/types/banner";

const Navigation = ({ bannerType }: { bannerType: BannerTypes }) => {
  const sections: {
    "increased-chance"?: string;
    "more-info": string;
    "items-list": string;
  } = {
    "increased-chance": "Повышенный шанс",
    "more-info": "Подробности",
    "items-list": "Список предметов",
  };

  if (bannerType === "Standard Wish") {
    delete sections["increased-chance"];
  }

  return (
    <div
      className={
        "absolute bg-[radial-gradient(circle,rgba(232,223,207,1)_90%,rgba(232,223,207,0.1)_100%)] text-[#595252] text-[1.3vw] w-[80%] h-[9%] top-[12.5%] left-[10%] flex justify-between items-center"
      }
    >
      <div
        className={
          "w-full h-[85%] flex justify-between items-center border-y border-y-[#ede5d7]"
        }
      >
        {Object.entries(sections).map((section) => (
          <NavigationButton
            key={section[0]}
            title={section[1]}
            param={section[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
