import primogem from "@/public/wish-simulator/primogem.webp";
import intertwinedFate from "@/public/wish-simulator/intertwined-fate.webp";
import Image from "next/image";
const CurrentBalance = () => {
  return (
    <div
      className={
        "col-start-5 col-end-11 row-start-1 flex items-center gap-3 sm:col-start-8 sm:col-end-12 sm:mr-2 md:ml-4 md:mr-0 md:col-start-9 xl:col-start-10 justify-end"
      }
    >
      <div
        className={`group relative min-w-max flex h-[30%] w-3/4 items-center bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5] md:h-1/4 lg:w-[45%]`}
      >
        <Image
          src={primogem}
          alt={"Примогем"}
          quality={100}
          draggable={false}
          width={32}
          className={
            "h-[85%] w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"
          }
        />
        <p className={`font-genshin text-white text-base ml-2 md:text-lg`}>0</p>
        <button
          className={`font-genshin absolute right-0.5 bg-[#ece5d8] text-[#3b4354] w-1/4 h-[90%] text-lg md:text-xl font-bold flex justify-center items-center rounded-full transition-all active:opacity-50 active:scale-95 hover:scale-110`}
        >
          +
        </button>
      </div>
      <div
        className={
          "group flex w-1/2 min-w-max items-center h-[30%] md:h-1/4 md:w-1/4 bg-[rgba(0,0,0,0.4)] rounded-full ring-2 ring-[#84a4c5]"
        }
      >
        <Image
          src={intertwinedFate}
          alt={"Переплетающиеся судьбы"}
          quality={100}
          draggable={false}
          width={32}
          className={
            "h-full w-auto drop-shadow-lg select-none transition-all group-active:opacity-50"
          }
        />
        <p className={`font-genshin text-white text-base ml-2 md:text-lg`}>0</p>
      </div>
    </div>
  );
};
export default CurrentBalance;
