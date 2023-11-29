"use client";
import CloseButton from "@/app/wish-simulator/components/headerComponents/CloseButton";
import { useRouter } from "next/navigation";
import Balance from "@/app/wish-simulator/shop/components/paimonBargain/Balance";
import Navbar from "@/app/wish-simulator/shop/components/paimonBargain/Navbar";
import { useState } from "react";
import Image from "next/image";
import intertwinedFate from "@/public/wish-simulator/assets/intertwined-fate.webp";
import acquaintFate from "@/public/wish-simulator/assets/acquaint-fate.webp";
import fiveStarItemCard from "@/public/wish-simulator/assets/5-star-shop-card.webp";
import PaymentModal from "@/app/wish-simulator/shop/components/PaymentModal";
import { PaymentValets } from "@/app/lib/common";

export type Currency =
  | "masterless-stardust"
  | "masterless-starglitter"
  | "primogem";
export const currencies: { [key in Currency]: string } = {
  "masterless-starglitter": "Звёздный блеск",
  "masterless-stardust": "Звёздная пыль",
  primogem: "Камни Истока",
};
const currencyToCost: { [key in Currency]: number } = {
  "masterless-starglitter": 5,
  "masterless-stardust": 75,
  primogem: 160,
};
const PaimonBargain = () => {
  const router = useRouter();
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    "masterless-starglitter",
  );
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [shopItem, setShopItem] = useState<PaymentValets | null>(null);
  return (
    <section className={"z-10 flex-1"}>
      <header className={"flex gap-10 justify-end items-center h-20 pr-10"}>
        <Balance />
        <CloseButton handler={() => router.replace("/wish-simulator")} />
      </header>
      <Navbar
        currentCurrency={currentCurrency}
        setCurrency={setCurrentCurrency}
      />
      <div className={"mt-12 ml-28 flex flex-wrap gap-6 text-[#f7f5f6]"}>
        <div
          className={
            "relative w-fit transition-all hover:scale-105 hover:drop-shadow-shop"
          }
          onClick={() => {
            setShopItem("intertwined-fate");
            setIsPayment(true);
          }}
        >
          <Image
            src={fiveStarItemCard}
            width={300}
            alt={"Фон пятизвёздочного предмета в магазине"}
            quality={100}
          />
          <Image
            src={intertwinedFate}
            alt={"Переплетающиеся судьбы"}
            className={"absolute top-0 left-[18%] w-[65%]"}
          />
          <p
            className={
              "absolute top-[55%] w-full drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] text-2xl text-center"
            }
          >
            Переплетающиеся <br /> судьбы
          </p>
          <div
            className={
              "absolute bottom-2 w-full flex items-center justify-center gap-1"
            }
          >
            <Image
              src={`/wish-simulator/assets/${currentCurrency}.webp`}
              alt={currencies[currentCurrency]}
              quality={100}
              width={40}
              height={40}
            />
            <p className={"text-xl"}>{currencyToCost[currentCurrency]}</p>
          </div>
        </div>
        <div
          className={
            "relative w-fit transition-all hover:scale-105 hover:drop-shadow-shop"
          }
          onClick={() => {
            setShopItem("acquaint-fate");
            setIsPayment(true);
          }}
        >
          <Image
            src={fiveStarItemCard}
            alt={"Фон пятизвёздочного предмета в магазине"}
            width={300}
            quality={100}
          />
          <Image
            src={acquaintFate}
            alt={"Судьбоносные встречи"}
            className={"absolute top-0 left-[18%] w-[65%]"}
          />
          <p
            className={
              "absolute top-[55%] w-full drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)] text-2xl text-center"
            }
          >
            Cудьбоносные <br /> встречи
          </p>
          <div
            className={
              "absolute bottom-2 w-full flex items-center justify-center gap-1"
            }
          >
            <Image
              src={`/wish-simulator/assets/${currentCurrency}.webp`}
              alt={currencies[currentCurrency]}
              quality={100}
              width={40}
              height={40}
            />
            <p className={"text-xl"}>{currencyToCost[currentCurrency]}</p>
          </div>
        </div>
      </div>
      {isPayment ? (
        <PaymentModal
          shopItem={shopItem as PaymentValets}
          closePaymentModal={() => setIsPayment(false)}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default PaimonBargain;
