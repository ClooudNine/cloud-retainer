"use client";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import Image from "next/image";
import { useCallback, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { playObtainAudioByRare } from "@/app/wish-simulator/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import star from "@/public/common-icons/star.png";
import masterlessStardust from "@/public/wish-simulator/assets/masterless-stardust.webp";
import wishResultBackground from "@/public/wish-simulator/assets/wish-result-bg.webp";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";

const renderWeaponResult = (
  supabase: SupabaseClient,
  weapon: Weapon,
  index: number,
) => {
  return (
    <div
      key={index}
      className={"h-full w-full flex items-center justify-center"}
    >
      <video
        className={"absolute top-0 left-0 object-cover w-screen h-screen -z-10"}
        src={`/wish-simulator/wish-animations/${weapon.rare}stareffect.mp4`}
        autoPlay
      ></video>
      <div
        className={
          "absolute top-[7%] w-[90%] flex items-center justify-center animate-item-description-appearance md:top-[55%] md:w-[30%] md:left-[6vw]"
        }
      >
        <Image
          src={`/weapon-icons/${weapon.type}.webp`}
          alt={"Иконка " + weapon.type}
          width={150}
          height={150}
          quality={100}
          draggable={false}
          className={
            "h-auto w-auto -mt-[15%] -mr-[5%] -z-10 animate-item-icon-appearance"
          }
        />
        <div>
          <p
            className={
              "font-genshin text-white text-3xl leading-[1.1] animate-item-title-appearance md:text-5xl md:leading-[1.1]"
            }
          >
            {weapon.title}
          </p>
          <div className={"flex gap-1 mt-2"}>
            {Array.from({ length: weapon.rare }, (_, index) => (
              <Image
                key={index}
                src={star}
                alt={"Звезда"}
                quality={100}
                style={{
                  animationDelay: `${(index + 1) * 100}ms`,
                }}
                className={"opacity-0 animate-item-stars-appearance"}
              />
            ))}
          </div>
        </div>
      </div>
      <Image
        src={`/wish-simulator/items-backgrounds/${weapon.type}-background.webp`}
        alt={"Фон оружия"}
        width={950}
        height={950}
        quality={100}
        draggable={false}
        className={"absolute -z-10 animate-item-background-appearance"}
      />
      <Image
        src={
          supabase.storage
            .from("weapons splash arts")
            .getPublicUrl(`${weapon.title}.webp`).data.publicUrl
        }
        width={700}
        height={700}
        alt={weapon.title}
        className={
          "h-auto w-auto max-h-[60%] -z-10 animate-wish-item-appearance md:max-h-full"
        }
      />
      <div
        className={
          "absolute flex items-center gap-4 w-[90%] h-[9%] right-[5%] bottom-[7%] animate-masterless-currency-appearance md:w-[30%] md:right-0.5 md:bottom-[35%] lg:w-[22%]"
        }
      >
        <div className={"h-[110%] flex items-center justify-center"}>
          <div
            style={{
              clipPath:
                "polygon(50% 0, 70% 30%, 99% 48%, 70% 70%, 50% 100%, 30% 70%, 0 50%, 30% 30%)",
            }}
            className={
              "absolute animate-star-effect bg-[#fff4ff] w-[8rem] h-[8rem] rounded-full md:w-[11rem] md:h-[11rem]"
            }
          ></div>
          <Image
            src={masterlessStardust}
            alt={"Stardust/glitter"}
            className={
              "h-full w-auto drop-shadow-[0_0_30px_rgba(209,134,246,1)]"
            }
          />
        </div>
        <div className={"font-genshin flex flex-col gap-3 mb-10 ml-6"}>
          <p className={"text-white text-lg md:text-xl"}>Extra</p>
          <p className={"text-[#f1aafc] text-xl md:text-2xl"}>
            Masterless Stardust
          </p>
          <p className={"text-[#f1aafc] text-xl md:text-2xl"}>x15</p>
        </div>
      </div>
    </div>
  );
};

const renderCharacterResult = (
  supabase: SupabaseClient,
  character: Character,
  index: number,
) => {
  return (
    <div
      key={index}
      className={"h-full w-full flex items-center justify-center"}
    >
      <video
        className={"absolute top-0 left-0 object-cover w-screen h-screen -z-10"}
        src={`/wish-simulator/wish-animations/${character.rare}stareffect.mp4`}
        autoPlay
      ></video>
      <div
        className={
          "absolute top-[7%] w-[90%] flex items-center justify-center animate-item-description-appearance md:top-[55%] md:w-[30%] md:left-[6vw]"
        }
      >
        <Image
          src={`/common-icons/${character.element}.svg`}
          alt={character.element}
          width={100}
          height={100}
          quality={100}
          draggable={false}
          className={"-mt-[10%] -mr-[1%] -z-10 animate-item-icon-appearance"}
        />
        <div>
          <p
            className={
              "font-genshin text-white text-3xl leading-[1.1] animate-item-title-appearance md:text-5xl md:leading-[1.1]"
            }
          >
            {character.name}
          </p>
          <div className={"flex gap-1 mt-2"}>
            {Array.from({ length: character.rare }, (_, index) => (
              <Image
                key={index}
                src={star}
                alt={"Звезда"}
                quality={100}
                style={{
                  animationDelay: `${(index + 1) * 100}ms`,
                }}
                className={"opacity-0 animate-item-stars-appearance"}
              />
            ))}
          </div>
        </div>
      </div>
      <Image
        src={
          supabase.storage
            .from("characters splash arts")
            .getPublicUrl(`${character.name}.webp`).data.publicUrl
        }
        width={2000}
        height={2000}
        quality={100}
        alt={character.name}
        className={
          "w-screen h-screen object-cover max-h-[60%] -z-10 animate-wish-item-appearance md:max-h-full"
        }
      />
    </div>
  );
};

const WishDrop = ({
  droppedItems,
}: {
  droppedItems: (Character | Weapon)[];
}) => {
  const supabase = createClientComponentClient();
  const { setDroppedItems } = useBannerContext();
  const [isAnimationPlaying, setIsAnimationPlaying] = useState<boolean>(true);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

  const pullCounts = droppedItems.length;
  const maxRare = Math.max(...droppedItems.map((item) => item.rare));

  const nextItemCallback = useCallback(() => {
    if (currentItemIndex < droppedItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      playObtainAudioByRare(droppedItems[currentItemIndex + 1].rare);
    } else {
      setDroppedItems([]);
    }
  }, [currentItemIndex, droppedItems, setDroppedItems]);

  return (
    <section
      className={"absolute h-full w-full z-20 overflow-hidden select-none"}
      onClick={isAnimationPlaying ? undefined : () => nextItemCallback()}
    >
      {isAnimationPlaying ? (
        <video
          className={"absolute top-0 left-0 object-cover w-screen h-screen"}
          src={`/wish-simulator/wish-animations/${pullCounts}-pull-${maxRare}-star.mp4`}
          autoPlay
          onEnded={() => {
            setIsAnimationPlaying(false);
            playObtainAudioByRare(droppedItems[currentItemIndex].rare);
          }}
        ></video>
      ) : (
        <>
          <Image
            src={wishResultBackground}
            draggable={false}
            alt={"Фон результата сделанных молитв"}
            fill
            quality={100}
            className={"select-none object-cover -z-20"}
          />
          {"type" in droppedItems[currentItemIndex]
            ? renderWeaponResult(
                supabase,
                droppedItems[currentItemIndex] as Weapon,
                currentItemIndex,
              )
            : renderCharacterResult(
                supabase,
                droppedItems[currentItemIndex] as Character,
                currentItemIndex,
              )}
        </>
      )}
    </section>
  );
};

export default WishDrop;
