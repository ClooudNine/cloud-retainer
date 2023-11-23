import Image from "next/image";
import arrow from "@/public/wish-simulator/assets/arrow-prev.svg";
import { Dispatch, SetStateAction } from "react";

const TablePagination = ({
  wishCount,
  currentPage,
  setPage,
}: {
  wishCount: number;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      className={
        "absolute flex items-center justify-center w-full h-[10%] bottom-[6.5%] gap-20"
      }
    >
      <button
        className={
          "w-[2.5vw] cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60"
        }
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        <Image src={arrow} alt={"Предыдущие 5 молитв"} quality={100} />
      </button>
      <p className={"text-[#595252] text-[1.8vw]"}>{currentPage}</p>
      <button
        className={
          "w-[2.5vw] cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60"
        }
        disabled={currentPage === Math.ceil(wishCount / 5)}
        onClick={() => setPage(currentPage + 1)}
      >
        <Image
          src={arrow}
          alt={"Следующие 5 молитв"}
          quality={100}
          className={"rotate-180"}
        />
      </button>
    </div>
  );
};

export default TablePagination;
