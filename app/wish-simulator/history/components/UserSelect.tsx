"use client";
import { bannerHistoryTypes } from "@/lib/banners";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const UserSelect = () => {
  const router = useRouter();
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  useEffect(() => {
    setSelectedOption(localStorage.getItem("LastBanner") as string);
  }, []);
  const selectOptionClick = useCallback(
    (bannerType: string) => {
      setSelectedOption(bannerType);
      setIsSelectOpen(false);
      router.replace(`/wish-simulator/history/?type=${bannerType}&page=1`);
    },
    [router],
  );
  return (
    <>
      <p
        className={
          "absolute text-[#595252] text-[2vw] md:text-[1.3vw] top-[14%] left-[15%]"
        }
      >
        Тип Молитвы
      </p>
      <div className="z-10 absolute w-[58%] h-[6.5%] select-none text-[#595252] text-[2vw] md:text-[1.3vw] top-[13%] left-[32%]">
        <div
          className="h-full flex justify-between items-center mx-3"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          <p className={"truncate"}>{bannerHistoryTypes[selectedOption]}</p>
          <svg
            className={`w-[2vw] ${isSelectOpen ? "rotate-0" : "rotate-180"}`}
            fill="#595252"
            version="1.1"
            viewBox="0 -4.5 20 20"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <g fill="none" fillRule="evenodd" strokeWidth="1">
                <g transform="translate(-260 -6684)" fill="#595252">
                  <g transform="translate(56 160)">
                    <path d="m223.71 6534.6c0.38974-0.4049 0.38974-1.0604 0-1.4643l-8.2636-8.5629c-0.78049-0.80876-2.0467-0.80876-2.8271 0l-8.3245 8.6251c-0.38575 0.40075-0.39074 1.048-0.009993 1.4539 0.38874 0.41526 1.0293 0.4194 1.4241 0.0114l7.617-7.894c0.39074-0.4049 1.0233-0.4049 1.4141 0l7.557 7.8308c0.38974 0.4049 1.0233 0.4049 1.4131 0" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        {isSelectOpen && (
          <div className="bg-[rgba(95,101,114,0.9)] rounded-3xl mt-[3%] ">
            {Object.entries(bannerHistoryTypes).map((option) => (
              <div
                key={option[0]}
                className={
                  "px-6 py-4 rounded-full text-white text-[2.2vw] md:text-[1.3vw] hover:bg-[#717887]"
                }
                onClick={() => selectOptionClick(option[0])}
              >
                {option[1]}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserSelect;
