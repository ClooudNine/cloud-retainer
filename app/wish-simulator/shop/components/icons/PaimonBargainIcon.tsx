"use client";
import { useSearchParams } from "next/navigation";
import { Sections } from "@/app/wish-simulator/shop/page";
import clsx from "clsx";

const PaimonBargainIcon = ({ param }: { param: Sections }) => {
  const searchParams = useSearchParams();
  const iconClasses = clsx("z-10 w-8 ml-6", {
    "fill-[#3b4254]": searchParams.get("section") === param,
    "fill-[#ece5d7] group-active:fill-[#3b4254]":
      searchParams.get("section") !== param,
  });
  return (
    <svg
      className={iconClasses}
      version="1.0"
      viewBox="9.92 10.13 30.12 35.83"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 56) scale(.1 -.1)">
        <path d="m197 452c-16-7-15-10 10-32 35-32 54-31 88 0 24 22 24 25 8 31-23 10-83 10-106 1z" />
        <path d="m168 323c-80-83-88-125-35-178 57-57 184-60 239-5 47 48 36 101-38 180-40 42-52 50-83 50s-44-8-83-47zm96-38c4-15 16-27 31-31 32-8 32-20 0-28-15-4-27-16-31-31-8-32-20-32-28 0-4 15-16 27-31 31-32 8-32 20 0 28 15 4 27 16 31 31 3 14 10 25 14 25s11-11 14-25z" />
      </g>
    </svg>
  );
};

export default PaimonBargainIcon;
