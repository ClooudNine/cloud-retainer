import Image from "next/image";
import wishIcon from "@/public/wish-simulator/assets/wish-icon.webp";

const Title = () => {
  return (
    <div
      className={
        "col-start-1 col-end-3 ml-2 flex items-center gap-2 md:justify-center md:flex-col md:ml-4 lg:flex-row xl:gap-6"
      }
    >
      <Image
        src={wishIcon}
        alt={"Иконка раздела молитв"}
        draggable={false}
        quality={100}
        className={"select-none h-[30%] w-auto xl:h-2/5"}
      />
      <p
        className={
          "font-genshin text-white text-base drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] sm:text-xl xl:text-2xl"
        }
      >
        Молитва
      </p>
    </div>
  );
};
export default Title;
