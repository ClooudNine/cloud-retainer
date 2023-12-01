import Image from "next/image";
import fiveStarItemBackground from "@/public/wish-simulator/items-backgrounds-by-rarity/background-item-5-star.webp";
import star from "@/public/common-icons/star.webp";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import { Weapon } from "@/app/lib/weapon";
import clsx from "clsx";

const WeaponPreview = ({
  isOverview,
  currentEpitomizedWeapon,
  setCurrentEpitomizedWeapon,
  weaponId,
  order,
}: {
  isOverview: boolean;
  currentEpitomizedWeapon: number | null;
  setCurrentEpitomizedWeapon: (weaponId: number) => void;
  weaponId: number;
  order: number;
}) => {
  const { weapons, currentBanners, selectedBanner, currentBannersPortraits } =
    useBannerContext();
  const weapon = weapons.find((weapon) => weapon.id === weaponId) as Weapon;
  const weaponPreviewClasses = clsx(
    "group relative w-[40%] h-[90%] md:w-[30%] md:h-[70%] bg-[#e9e5dc] rounded transition-all duration-100 active:scale-95",
    {
      "scale-105 border-4 border-y-[#c0ff40] hover:ring-0":
        currentEpitomizedWeapon === weaponId && !isOverview,
      "hover:ring-4 hover:ring-white hover:scale-105":
        currentEpitomizedWeapon !== weaponId || isOverview,
    },
  );

  return (
    <div
      className={weaponPreviewClasses}
      onClick={
        !isOverview ? () => setCurrentEpitomizedWeapon(weaponId) : undefined
      }
    >
      <Image
        src={fiveStarItemBackground}
        alt={"Фон предмета пятизвёздочной редкости"}
        className={"h-[83%] rounded-t rounded-br-3xl group-hover:saturate-150"}
      />
      {currentEpitomizedWeapon === weaponId && !isOverview ? (
        <div
          className={
            "z-10 text-[#6c900d] text-[1.7cqw] flex justify-center absolute w-[2.3cqw] font-black bg-[#c0ff40] rounded -top-0.5 right-0"
          }
        >
          &#10004;
        </div>
      ) : (
        ""
      )}
      <Image
        src={
          currentBannersPortraits[currentBanners.indexOf(selectedBanner)][order]
        }
        alt={"Иконка оружия " + weapon.title}
        width={130}
        height={130}
        quality={100}
        className={"w-full h-auto absolute top-0"}
      />
      <div className={"-mt-[1.3cqw]"}>
        <div className={"flex justify-center ml-auto"}>
          {Array.from(Array(weapon.rare).keys()).map((number) => (
            <Image
              key={number}
              src={star}
              alt={"Звезда"}
              width={18}
              quality={100}
              className={"z-10 w-[1.6cqw]"}
            />
          ))}
        </div>
        <p
          className={
            "truncate text-[2cqw] md:text-[1.5cqw] text-[#495366] pl-1 -mt-1"
          }
        >
          {weapon.title}
        </p>
      </div>
    </div>
  );
};

export default WeaponPreview;
