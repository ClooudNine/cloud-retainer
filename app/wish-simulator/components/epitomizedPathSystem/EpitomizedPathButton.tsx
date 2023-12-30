import Image from "next/image";
import epitomizedPathButtonActive from "@/public/wish-simulator/assets/epitomized-path-button-active.webp";
import epitomizedPathButton from "@/public/wish-simulator/assets/epitomized-path-button.webp";
import { useState } from "react";
import EpitomizedPathModal from "@/app/wish-simulator/components/epitomizedPathSystem/EpitomizedPathModal";
import { WeaponBanner } from "@/lib/db/schema";

const EpitomizedPathButton = ({
  weaponBanner,
}: {
  weaponBanner: WeaponBanner;
}) => {
  const [epitomizedPathIsOpen, setEpitomizedPathIsOpen] =
    useState<boolean>(false);
  const [epitomizedPathIsHover, setEpitomizedPathIsHover] =
    useState<boolean>(false);
  const epitomizedStatus = JSON.parse(localStorage.getItem("EpitomizedPath")!)[
    weaponBanner.id
  ];
  return (
    <>
      <div
        className={
          "z-10 absolute bottom-[25%] w-36 flex justify-center left-[5%] transition-all animate-banner-preview-appearance lg:w-[10%] lg:bottom-[19%] hover:scale-105"
        }
        onMouseEnter={() => setEpitomizedPathIsHover(true)}
        onMouseLeave={() => setEpitomizedPathIsHover(false)}
        onClick={() => setEpitomizedPathIsOpen(true)}
      >
        <Image
          src={
            epitomizedPathIsHover
              ? epitomizedPathButtonActive
              : epitomizedPathButton
          }
          alt={"Путь воплощения"}
          quality={100}
          className={"w-full h-auto"}
        />
        <div
          className={
            "absolute text-sm leading-[1] flex justify-center items-center text-center text-[#525b6c] self-end px-2 h-[30%] w-full xl:text-[1.2rem]"
          }
        >
          {epitomizedStatus ? `${epitomizedStatus.count}/2` : "Путь воплощения"}
        </div>
      </div>
      {epitomizedPathIsOpen && (
        <EpitomizedPathModal
          closeModal={() => setEpitomizedPathIsOpen(false)}
          weaponBanner={weaponBanner}
        />
      )}
    </>
  );
};
export default EpitomizedPathButton;
