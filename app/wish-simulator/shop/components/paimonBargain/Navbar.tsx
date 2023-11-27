import { Dispatch, SetStateAction } from "react";
import {
  currencies,
  Currency,
} from "@/app/wish-simulator/shop/components/paimonBargain/PaimonBargain";
import NavbarButton from "@/app/wish-simulator/shop/components/paimonBargain/NavbarButton";

export const Navbar = ({
  currentCurrency,
  setCurrency,
}: {
  currentCurrency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
}) => {
  return (
    <nav
      className={
        "ml-12 w-[70%] flex items-center text-xl border-y-2 border-y-[rgba(0,0,0,0.2)] h-14 bg-[radial-gradient(circle,rgba(59,66,84,0.7)_90%,rgba(59,66,84,0)_100%)]"
      }
    >
      <div
        className={
          "flex items-center h-[90%] w-full border-y border-y-[#7f7279]"
        }
      >
        {Object.entries(currencies).map((currency) => (
          <NavbarButton
            key={currency[0]}
            currentCurrency={currentCurrency}
            currency={currency as [Currency, string]}
            setCurrency={() => setCurrency(currency[0] as Currency)}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
