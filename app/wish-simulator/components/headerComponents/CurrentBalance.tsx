"use client";
import Image from "next/image";
import primogem from "@/public/wish-simulator/assets/primogem.webp";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";

const CurrentBalance = () => {
  const { paymentValet } = useBannerContext();
  return (
    <div
      className={
        "flex items-center justify-end font-genshin col-start-5 col-end-11 gap-3 sm:col-start-8 sm:col-end-12 md:ml-4 md:col-start-9 xl:ml-0 xl:col-start-10"
      }
    >
      <div
        className={
          "relative flex items-center h-[30%] w-[70%] bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5] md:h-1/4 2xl:min-w-max 2xl:w-1/2"
        }
      >
        <div className={"absolute h-full w-full peer"}></div>
        <Image
          src={primogem}
          alt={"Примогем"}
          quality={100}
          draggable={false}
          width={40}
          className={
            "h-[95%] w-auto select-none drop-shadow transition-all active:opacity-50 peer-active:opacity-50"
          }
        />
        <p className={"text-white text-base ml-2 max-2xl:truncate md:text-lg"}>
          {localStorage.getItem("Balance") ? JSON.parse(localStorage.getItem("Balance")!)["primogems"] : 0}
        </p>
        <button
          className={
            "z-10 bg-[#ece5d8] text-[#3b4354] w-1/4 h-[90%] ml-auto mr-0.5 text-lg font-bold flex justify-center items-center rounded-full transition-all cursor-genshin md:text-xl active:opacity-50 active:scale-95 hover:scale-110"
          }
        >
          +
        </button>
      </div>
      <div
        className={
          "group flex items-center h-[30%] w-[30%] md:h-1/4 bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5] 2xl:min-w-max"
        }
      >
        <Image
          src={`/wish-simulator/assets/${paymentValet}.webp`}
          alt={"Переплетающиеся судьбы"}
          quality={100}
          draggable={false}
          width={40}
          height={40}
          className={
            "h-[95%] w-auto drop-shadow select-none transition-all group-active:opacity-50"
          }
        />
        <p className={"text-white text-base ml-2 max-2xl:truncate md:text-lg"}>
          {localStorage.getItem("Balance") ? JSON.parse(localStorage.getItem("Balance")!)[paymentValet] : 0}
        </p>
      </div>
    </div>
  );
};
export default CurrentBalance;
