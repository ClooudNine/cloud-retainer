"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WishHistory } from "@/app/types/common";
import TablePagination from "@/app/wish-simulator/history/components/TablePagination";

const HistoryTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [history, setHistory] = useState<WishHistory>([]);

  useEffect(() => {
    const bannerType = searchParams.get("type") as string;
    setHistory(JSON.parse(localStorage.getItem(bannerType)!)["history"]);
  }, [searchParams]);

  if (history.length === 0) {
    return (
      <p
        className={
          "absolute text-[#595252] text-[3vw] md:text-[2.1vw] top-[45%] left-[20%]"
        }
      >
        История по данному типу отсутствует!
      </p>
    );
  }

  return (
    <>
      <div
        className={
          "absolute w-[81.5%] h-[60%] top-[24%] left-[9%] overflow-y-scroll genshin-scrollbar"
        }
      >
        <p className={"text-[3vw] md:text-[1vw] text-[#9a8e8e]"}>
          Всего молитв сделано: {history.length}
        </p>
        <div className={"flex gap-3.5 md:gap-12"}>
          <div>
            <p className={"text-[3vw] md:text-[1vw] text-[#9659c7]"}>
              Всего предметов 4★ получено:{" "}
              {history.filter((wish) => wish.item.rare === 4).length}
            </p>
            <p className={"text-[3vw] md:text-[1vw] text-[#bd6932]"}>
              Всего предметов 5★ получено:{" "}
              {history.filter((wish) => wish.item.rare === 5).length}
            </p>
          </div>
          {searchParams.get("type") === "CharacterEventWish" ||
          searchParams.get("type") === "WeaponEventWish" ? (
            <div>
              <p className={"text-[3vw] md:text-[1vw] text-[#9659c7]"}>
                Текущий статус гаранта 4★:
                {JSON.parse(localStorage.getItem(searchParams.get("type")!)!)[
                  "fourStarGuaranteed"
                ] ? (
                  <em className={"not-italic text-green-500"}> Да</em>
                ) : (
                  <em className={"not-italic text-red-600"}> Нет</em>
                )}
              </p>
              <p className={"text-[3vw] md:text-[1vw] text-[#bd6932]"}>
                Текущий статус гаранта 5★:
                {JSON.parse(localStorage.getItem(searchParams.get("type")!)!)[
                  "fiveStarGuaranteed"
                ] ? (
                  <em className={"not-italic text-green-500"}> Да</em>
                ) : (
                  <em className={"not-italic text-red-600"}> Нет</em>
                )}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <table
          className={
            "absolute border mt-2 mr-2 border-[#dac69f] text-[2.5vw] md:text-[1.2vw] leading-tight"
          }
        >
          <thead>
            <tr className={"text-[#595252]"}>
              <th
                className={
                  "w-[15%] border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4"
                }
              >
                Тип
              </th>
              <th
                className={
                  "w-[30%] border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4"
                }
              >
                Имя
              </th>
              <th
                className={
                  "w-[25%] border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4"
                }
              >
                Тип Молитвы
              </th>
              <th
                className={
                  "border border-[#dac69f] bg-[#ede1ca] font-normal md:p-4"
                }
              >
                Время молитвы
              </th>
            </tr>
          </thead>
          <tbody>
            {history
              .slice(
                (Number(searchParams.get("page")) - 1) * 5,
                (Number(searchParams.get("page")) - 1) * 5 + 5,
              )
              .map((wish, index) => (
                <tr key={index} className={"text-[#9a8e8e]"}>
                  {Object.values(wish).map((param, paramIndex) => (
                    <td
                      key={`${index}-${paramIndex}`}
                      className={
                        "border border-[#dac69f] bg-[#f6f1e7] text-center p-2 md:p-4"
                      }
                    >
                      {typeof param === "object" ? (
                        <p
                          className={`${
                            param.rare === 5
                              ? "text-[#bd6932]"
                              : param.rare === 4
                              ? "text-[#9659c7]"
                              : ""
                          }`}
                        >
                          {param.name}
                          {param.rare > 3 ? ` (${param.rare}★)` : ""}
                        </p>
                      ) : (
                        param
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        wishCount={history.length}
        currentPage={Number(searchParams.get("page"))}
        setPage={(pageNumber) =>
          router.replace(
            `/wish-simulator/history/?type=${searchParams.get(
              "type",
            )}&page=${pageNumber}`,
          )
        }
      />
    </>
  );
};

export default HistoryTable;
