import Image from "next/image";
import epitomizedPathModal from "@/public/wish-simulator/assets/epitomized-path-modal.webp";
import epitomizedPathExistsImage from "@/public/wish-simulator/assets/epitomized-path-exists.webp";
import { WeaponBanner } from "@/app/types/banner";
import WeaponPreview from "@/app/wish-simulator/components/epitomizedPathSystem/WeaponPreview";
import { useCallback, useEffect, useState } from "react";
import { useBannerContext } from "@/app/wish-simulator/components/BannerProvider";
import ResetEpitomizedPathModal from "@/app/wish-simulator/components/epitomizedPathSystem/ResetEpitomizedPathModal";
import { EpitomizedStats } from "@/app/types/common";

export const EpitomizedPathModal = ({
  closeModal,
  weaponBanner,
}: {
  closeModal: () => void;
  weaponBanner: WeaponBanner;
}) => {
  const { weapons } = useBannerContext();

  const [epitomizedPathExists, setEpitomizedPathExists] =
    useState<boolean>(false);
  const [epitomizedWeapon, setEpitomizedWeapon] = useState<number | null>(null);
  const [epitomizedCount, setEpitomizedCount] = useState<number>(0);
  const [resetIsOpen, setResetIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const epitomizedPath: EpitomizedStats | null = JSON.parse(
      localStorage.getItem("EpitomizedPath")!,
    )[weaponBanner.id];
    if (epitomizedPath) {
      setEpitomizedWeapon(epitomizedPath.weaponId);
      setEpitomizedCount(epitomizedPath.count);
      setEpitomizedPathExists(true);
    } else {
      setEpitomizedWeapon(weaponBanner.first_main_weapon);
      setEpitomizedCount(0);
    }
  }, [weaponBanner]);

  const setEpitomizedPath = useCallback(() => {
    const epitomizedPath = JSON.parse(localStorage.getItem("EpitomizedPath")!);
    epitomizedPath[weaponBanner.id] = {
      weaponId: epitomizedWeapon,
      count: 0,
    };
    setEpitomizedPathExists(true);
    localStorage.setItem("EpitomizedPath", JSON.stringify(epitomizedPath));
  }, [epitomizedWeapon, weaponBanner.id]);

  const resetEpitomizedPath = useCallback(() => {
    const epitomizedPath = JSON.parse(localStorage.getItem("EpitomizedPath")!);
    delete epitomizedPath[weaponBanner.id];
    localStorage.setItem("EpitomizedPath", JSON.stringify(epitomizedPath));
    setEpitomizedPathExists(false);
    setResetIsOpen(false);
  }, [weaponBanner.id]);

  return (
    <section
      className={
        "absolute z-10 w-screen h-screen bg-[rgba(0,0,0,0.8)] font-genshin flex justify-center items-center"
      }
    >
      <div
        className={"w-[95%] md:w-[90%] lg:w-[70%] 2xl:w-[60%] relative"}
        style={{ containerType: "inline-size" }}
      >
        <Image
          src={epitomizedPathModal}
          quality={100}
          alt={"Модальное окно системы 'Путь воплощения'"}
        />
        <p
          className={"absolute top-[7%] left-[11%] text-[#84633e] text-[3cqw]"}
        >
          Путь воплощения
        </p>
        <div
          className={
            "absolute top-[19%] left-[8%] w-[37%] h-[72%] overflow-y-scroll scrollbar-for-epitomized-path"
          }
        >
          <div
            className={
              "text-[#a68e75] text-[3cqw] leading-normal [&_em]:text-[#e9b56b] [&_em]:not-italic lg:text-[2cqw]"
            }
          >
            <p>
              Путь воплощения - это механика, включённая в текущий цикл молитвы
              &quot;Воплощение божества&quot;:
            </p>
            <ul className={"list-disc list-inside"}>
              <li>
                После установки курса на желаемое оружие, если вы&nbsp;
                <em>
                  получите оружие 5★, которое не соответствует вашему выбору
                </em>
                , вы получите 1 очко Судьбы.
              </li>
              <li>
                Когда вы наберёте достаточно очков Судьбы, ваше следующее оружие
                5★ будет тем, что вы выбрали с помощью Пути воплощения.
              </li>
              <li>
                <em>
                  После получения оружия Пути воплощения молитвы
                  &quot;Воплощение божества&quot; ваши очки Судьбы будут
                  сброшены
                </em>
                .
              </li>
              <li>
                Если вы не выберете оружие, очки Судьбы не будут накапливаться.
              </li>
              <li>
                Вы можете изменить или отменить свой выбор.
                <em>Это сбросит накопленные вами очки Судьбы</em>.
              </li>
              <li>
                <em>
                  Накопленные вам очки Судьбы также обнулятся, когда текущий
                  цикл молитвы &quot;Воплощение божества&quot; закончится
                </em>
                .
              </li>
            </ul>
          </div>
        </div>
        <svg
          className={"group z-10 absolute w-[5cqw] top-[3%] right-[3%]"}
          onClick={() => closeModal()}
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#000000"
          stroke="#000000"
          strokeWidth="0.00016"
          transform="rotate(45)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              className={
                "transition-all group-hover:fill-[#495366] group-active:fill-[#bebebe]"
              }
              fill="#707783"
              d="M16 8l-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
            ></path>
          </g>
        </svg>
        {epitomizedPathExists ? (
          <>
            <Image
              src={epitomizedPathExistsImage}
              alt={"Выбранное оружие пути воплощения"}
              className={"absolute top-0 right-0 h-full w-auto"}
            />
            <p
              className={
                "absolute text-[#495366] text-[3.2cqw] top-[10%] right-[10%]"
              }
            >
              Выбранное оружие
            </p>
            <div
              className={
                "absolute flex justify-center items-center gap-8 w-[35.5%] h-[30%] top-[27%] right-[7%]"
              }
            >
              <WeaponPreview
                isOverview={true}
                currentEpitomizedWeapon={epitomizedWeapon}
                setCurrentEpitomizedWeapon={(weaponId: number) =>
                  setEpitomizedWeapon(weaponId)
                }
                weaponId={epitomizedWeapon as number}
                order={[
                  weaponBanner.first_main_weapon,
                  weaponBanner.second_main_weapon,
                ].indexOf(epitomizedWeapon as number)}
              />
            </div>
            <div className={"absolute w-[35.5%] bottom-[22%] right-[7%]"}>
              <p className={"text-center text-[2cqw] text-[#495366]"}>
                Очки Судьбы:&nbsp;
                <em className={"text-[#f39000] not-italic"}>
                  {epitomizedCount}
                </em>
                /2
              </p>
            </div>
            <button
              className={
                "absolute group cursor-genshin w-[25%] h-[8%] transition-all text-[#ece5d8] text-[2cqw] bg-[#4a5366] rounded-full bottom-[10%] right-[11.5%] hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-[#ffe6b2] active:bg-[#ffeccb] active:outline-[#b5b2ae]"
              }
              onClick={() => setResetIsOpen(true)}
            >
              <div
                className={
                  "absolute flex justify-center items-center ml-2 w-[3cqw] h-[3cqw] bg-[#313131] place-self-start rounded-full group-active:opacity-50"
                }
              >
                <svg
                  className={"h-[60%]"}
                  fill="#98cb33"
                  viewBox="0 0 1920.00 1920.00"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#98cb33"
                  strokeWidth="0.019200000000000002"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                      fillRule="evenodd"
                    ></path>
                  </g>
                </svg>
              </div>
              <p className={"ml-4"}>Отменить курс</p>
            </button>
            {resetIsOpen ? (
              <ResetEpitomizedPathModal
                closeResetModal={() => setResetIsOpen(false)}
                confirmReset={() => resetEpitomizedPath()}
              />
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <p
              className={
                "absolute text-[#495366] text-[3cqw] top-[9%] right-[11%]"
              }
            >
              Выбрать оружие
            </p>
            <div
              className={
                "absolute flex justify-center items-center gap-8 w-[35.5%] h-[30%] top-[25%] right-[7%]"
              }
            >
              {[
                weaponBanner.first_main_weapon,
                weaponBanner.second_main_weapon,
              ].map((mainWeapon, index) => (
                <WeaponPreview
                  key={mainWeapon}
                  isOverview={false}
                  currentEpitomizedWeapon={epitomizedWeapon}
                  setCurrentEpitomizedWeapon={(weaponId: number) =>
                    setEpitomizedWeapon(weaponId)
                  }
                  weaponId={mainWeapon}
                  order={index}
                />
              ))}
            </div>
            <div
              className={"absolute w-[35.5%] h-[30%] bottom-[10%] right-[7%]"}
            >
              <p className={"text-center text-[2.5cqw] text-[#495366]"}>
                Курс на предмет: <br />
                <em className={"text-[#f39000] not-italic"}>
                  {
                    weapons.find((weapon) => weapon.id === epitomizedWeapon)
                      ?.title
                  }
                </em>
              </p>
            </div>
            <button
              className={
                "absolute group cursor-genshin w-[25%] h-[8%] transition-all text-[#ece5d8] text-[2cqw] bg-[#4a5366] rounded-full bottom-[10%] right-[11.5%] hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-[#ffe6b2] active:bg-[#ffeccb] active:outline-[#b5b2ae]"
              }
              onClick={() => setEpitomizedPath()}
            >
              <div
                className={
                  "absolute flex justify-center items-center ml-2 w-[3cqw] h-[3cqw] bg-[#313131] place-self-start rounded-full group-active:opacity-50"
                }
              >
                <div
                  className={
                    "h-[50%] w-[50%] border-2 border-[#f3c433] rounded-full"
                  }
                ></div>
              </div>
              <p className={"ml-4"}>Выбрать курс</p>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default EpitomizedPathModal;
