import Image from "next/image";
import masterlessStarglitter from "@/public/wish-simulator/assets/masterless-starglitter.webp";
import masterlessStardust from "@/public/wish-simulator/assets/masterless-stardust.webp";
import primogem from "@/public/wish-simulator/assets/primogem.webp";

const Balance = () => {
  return (
    <>
      <div
        className={
          "group flex items-center h-8 w-20 bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]"
        }
      >
        <Image
          src={masterlessStarglitter}
          alt={"Переплетающиеся судьбы"}
          quality={100}
          draggable={false}
          width={40}
          className={
            "h-[95%] w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"
          }
        />
        <p className={"text-white text-base ml-3 max-2xl:truncate md:text-lg"}>
          0
        </p>
      </div>
      <div
        className={
          "group flex items-center h-8 w-28 bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5] "
        }
      >
        <Image
          src={masterlessStardust}
          alt={"Переплетающиеся судьбы"}
          quality={100}
          draggable={false}
          width={40}
          className={
            "h-[95%] w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"
          }
        />
        <p className={"text-white text-base ml-7 max-2xl:truncate md:text-lg"}>
          0
        </p>
      </div>
      <div
        className={
          "relative flex h-8 w-28 items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]"
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
            "h-[95%] w-auto drop-shadow-lg transition-all active:opacity-50 peer-active:opacity-50"
          }
        />
        <p
          className={
            "text-white text-base ml-5 mr-1 max-2xl:truncate md:text-lg"
          }
        >
          0
        </p>
        <button
          className={
            "bg-[#ece5d8] z-10 text-[#3b4354] w-1/4 h-[90%] ml-auto mr-0.5 text-lg font-bold flex justify-center items-center rounded-full transition-all cursor-genshin md:text-xl active:opacity-50 active:scale-95 hover:scale-110"
          }
        >
          +
        </button>
      </div>
    </>
  );
};

export default Balance;