"use client";
import Image from "next/image";
import wishButton from "@/public/wish-simulator/assets/wish-button.webp";
import intertwinedFate from "@/public/wish-simulator/assets/intertwined-fate.webp";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import { useCallback } from "react";
import { wish } from "@/app/wish-simulator/wishLogic";
import { Character } from "@/app/lib/character";
import { Weapon } from "@/app/lib/weapon";

const WishButton = ({ count }: { count: number }) => {
  const {
    selectedBanner,
    selectedBannerDrop,
    selectedBannerFeaturedItems,
    setDroppedItems,
  } = useBannerContext();

  const makeWish = useCallback(() => {
    let droppedItems: (Character | Weapon)[] = [];
    for (let i = 0; i < count; i++) {
      droppedItems.push(
        wish(
          selectedBanner,
          selectedBannerDrop,
          selectedBannerFeaturedItems,
        ) as Character | Weapon,
      );
    }
    console.log(droppedItems);
    setDroppedItems(droppedItems);
  }, [
    count,
    selectedBanner,
    selectedBannerDrop,
    selectedBannerFeaturedItems,
    setDroppedItems,
  ]);
  return (
    <button
      className={
        "relative w-full h-2/5 min-w-min transition-all select-none cursor-genshin duration-300 active:brightness-[0.85] md:h-3/5 md:w-[45%] xl:w-[35%]"
      }
      onClick={() => makeWish()}
    >
      <Image
        src={wishButton}
        quality={100}
        fill
        sizes={"(max-width: 768px) 50vw, 20vw"}
        alt={`Помолиться ${count} раз`}
        className={"-z-10"}
      />
      <p
        className={
          "font-genshin text-sm text-[#b4a08c] whitespace-nowrap sm:text-base lg:text-xl"
        }
      >
        Помолиться {count} раз
      </p>
      <div className={"flex h-1/2 justify-center items-center"}>
        <Image
          src={intertwinedFate}
          alt={"Переплетающиеся судьбы"}
          width={32}
          height={32}
          className={"pointer-events-none"}
        />
        <p
          className={
            "font-genshin text-sm text-[#ff5f40] sm:text-base lg:text-xl"
          }
        >
          x {count}
        </p>
      </div>
    </button>
  );
};

export default WishButton;
