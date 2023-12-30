import Background from "@/app/wish-simulator/components/Background";
import Image from "next/image";
import historyBook from "@/public/wish-simulator/assets/history-book.webp";
import Link from "next/link";
import Title from "@/app/wish-simulator/history/components/Title";
import UserSelect from "@/app/wish-simulator/history/components/UserSelect";
import HistoryTable from "@/app/wish-simulator/history/components/HistoryTable";
import { Suspense } from "react";

export const metadata = {
  title: "Cloud Retainer | Симулятор молитв - История",
  description: "Здесь отображены все сделанные вами молитвы в симуляторе",
};
function HistoryFallback() {
  return (
    <p className={"font-genshin text-7xl flex items-center justify-center"}>
      Loading history...
    </p>
  );
}
export default function WishHistory() {
  return (
    <main
      className={
        "w-full h-full flex items-center justify-center font-genshin cursor-genshin"
      }
    >
      <Background isBlurred={true} />
      <div className={"relative"}>
        <Image
          src={historyBook}
          draggable={false}
          quality={100}
          alt={"История молитв"}
          className={"w-full md:w-[80vw] h-auto"}
        />
        <Title />
        <UserSelect />
        <Link
          href={"/wish-simulator"}
          className={"absolute cursor-genshin top-[6%] right-[2.2%]"}
        >
          <svg
            className={"w-[3.5vw] md:w-[2.7vw]"}
            transform="rotate(45)"
            fill="#000000"
            stroke="#000000"
            strokeWidth=".00016"
            version="1.1"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={"group-active:fill-[#fefeff]"}
              d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
              fill="#e9d5af"
            />
          </svg>
        </Link>
        <Suspense fallback={<HistoryFallback />}>
          <HistoryTable />
        </Suspense>
      </div>
    </main>
  );
}
