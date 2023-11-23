"use client";
import { bannerStorages } from "@/app/types/banner";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const UserSelect = () => {
  const router = useRouter();
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  useEffect(() => {
    setSelectedOption(localStorage.getItem("lastBanner") as string);
  }, []);
  const selectOptionClick = useCallback(
    (bannerType: string) => {
      setSelectedOption(bannerType);
      setIsSelectOpen(false);
      router.replace(`/wish-simulator/history/?type=${bannerType}`);
    },
    [router],
  );
  return (
    <>
      <p
        className={
          "absolute text-[#595252] text-[1.7vw] md:text-[1.3vw] top-[13.5%] left-[15%]"
        }
      >
        Тип Молитвы
      </p>
      <div className="z-10 absolute w-[58%] h-[6.5%] select-none text-[#595252] text-[1.7vw] md:text-[1.3vw] top-[13%] left-[32%]">
        <div
          className="h-full flex justify-between items-center mx-3"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
        >
          <p className={"truncate"}>{bannerStorages[selectedOption]}</p>
          <svg
            viewBox="0 -4.5 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#595252"
            className={`w-[2vw] ${isSelectOpen ? "rotate-0" : "rotate-180"}`}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>arrow_up [#337]</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-260.000000, -6684.000000)"
                  fill="#595252"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                      d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
                      id="arrow_up-[#337]"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        {isSelectOpen && (
          <div className="bg-[rgba(95,101,114,0.9)] rounded-3xl mt-[3%] ">
            {Object.entries(bannerStorages).map((option) => (
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
