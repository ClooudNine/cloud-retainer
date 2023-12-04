"use client";
import Image from "next/image";
import shopButtonActive from "@/public/wish-simulator/assets/shop-button-active-background.webp";
import star from "@/public/wish-simulator/assets/star-for-description.webp";
import { useRouter, useSearchParams } from "next/navigation";
import { Sections } from "@/app/wish-simulator/shop/page";
import { useCallback } from "react";
import clsx from "clsx";

const SidebarButton = ({
  title,
  param,
  children,
}: {
  title: string;
  param: Sections;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paimonBargainButtonClasses = clsx(
    "relative group flex gap-4 w-full h-12 items-center text-xl transition-all hover:bg-[rgba(236,229,216,0.2)]",
    {
      "text-[#3b4254]": searchParams.get("section") === param,
      "text-[#ece5d7] active:text-[#3b4254]":
        searchParams.get("section") !== param,
    },
  );
  const buttonBackgroundClasses = clsx(
    "w-[105%] max-w-none h-auto absolute transition-all",
    {
      "opacity-100": searchParams.get("section") === param,
      "opacity-0 group-active:opacity-100":
        searchParams.get("section") !== param,
    },
  );
  const starClasses = clsx(
    "absolute right-0 transition-all duration-300 h-[50%] w-auto",
    {
      "opacity-100 translate-x-9": searchParams.get("section") === param,
      "opacity-0": searchParams.get("section") !== param,
    },
  );
  const selectShopSection = useCallback(() => {
    router.replace(`/wish-simulator/shop?section=${param}`);
  }, [param, router]);
  return (
    <button className={paimonBargainButtonClasses} onClick={selectShopSection}>
      <Image
        src={shopButtonActive}
        alt={"Фон активной кнопки магазина"}
        quality={100}
        className={buttonBackgroundClasses}
      />
      {children}
      <p className={"relative leading-tight text-left z-10"}>{title}</p>
      <Image src={star} alt={"Звезда"} className={starClasses} />
    </button>
  );
};

export default SidebarButton;
