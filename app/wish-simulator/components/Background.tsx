import Image from "next/image";
import wishSimulatorBackground from "@/public/wish-simulator/assets/wish-simulator-bg.webp";
import clsx from "clsx";

const Background = ({ isBlurred }: { isBlurred: boolean }) => {
  const backgroundClasses = clsx(
    "select-none object-cover object-left brightness-90 -z-10",
    {
      blur: isBlurred,
    },
  );
  return (
    <div
      className={
        "absolute w-full h-full shadow-[0_-50px_100px_50px_rgba(0,0,0,0.25)_inset]"
      }
    >
      <Image
        src={wishSimulatorBackground}
        alt={"Фоновое изображение раздела молитв"}
        quality={100}
        fill
        className={backgroundClasses}
      />
    </div>
  );
};
export default Background;
