import { Currency } from "@/app/wish-simulator/shop/components/paimonBargain/PaimonBargain";
import Image from "next/image";
import currencyButtonBackground from "@/public/wish-simulator/assets/select-currency-background.webp";
import clsx from "clsx";

const NavbarButton = ({
  currentCurrency,
  currency,
  setCurrency,
}: {
  currentCurrency: Currency;
  currency: [Currency, string];
  setCurrency: () => void;
}) => {
  const currencyButtonClasses = clsx(
    "group relative h-full w-[30%] transition-all",
    {
      "text-[#ece5d7] hover:drop-shadow-[0px_0px_15px_#ffffff] active:drop-shadow-none active:text-[#3b4254]":
        currentCurrency !== currency[0],
      "text-[#3b4254]": currentCurrency === currency[0],
    },
  );
  const currencyButtonBackgroundClasses = clsx(
    "absolute transition-all -mt-1 h-[115%] top-0 left-0",
    {
      "opacity-0 group-active:opacity-100": currentCurrency !== currency[0],
      "opacity-100": currentCurrency === currency[0],
    },
  );
  return (
    <button onClick={setCurrency} className={currencyButtonClasses}>
      <Image
        src={currencyButtonBackground}
        alt={"Фон кнопки выбора валюты"}
        className={currencyButtonBackgroundClasses}
      />
      <p className={"relative z-20"}>{currency[1]}</p>
    </button>
  );
};

export default NavbarButton;
