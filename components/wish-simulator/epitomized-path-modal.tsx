import Image from 'next/image';
import WeaponPreview from '@/components/wish-simulator/weapon-preview';
import { useCallback, useState } from 'react';
import { useBannerContext } from '@/components/wish-simulator/banner-provider';
import ResetEpitomizedPath from '@/components/wish-simulator/reset-epitomized-path';
import Confirm from '@/components/ui/confirm';

import { WeaponBanner } from '@/lib/types';

export const EpitomizedPathModal = ({ closeModal }: { closeModal: () => void }) => {
    const { selectedBanner, epitomizedPath, weapons, setEpitomizedPath } = useBannerContext();

    const weaponBanner = selectedBanner as WeaponBanner;
    const epitomizedStats = epitomizedPath[weaponBanner.id];

    const [epitomizedWeapon, setEpitomizedWeapon] = useState<number>(() =>
        epitomizedStats ? epitomizedStats.weaponId : weaponBanner.firstMainWeaponId
    );
    const [resetIsOpen, setResetIsOpen] = useState<boolean>(false);

    const resetEpitomizedPath = useCallback(() => {
        const updatedEpitomizedPath = { ...epitomizedPath };
        delete updatedEpitomizedPath[selectedBanner.id];
        setEpitomizedPath(updatedEpitomizedPath);
        localStorage.setItem('epitomizedPath', JSON.stringify(updatedEpitomizedPath));
        setResetIsOpen(false);
    }, [epitomizedPath, selectedBanner.id, setEpitomizedPath]);

    return (
        <section className={'z-10 absolute w-full h-full bg-black/70 flex justify-center items-center'}>
            <div className={'relative mx-4 animate-modal-appearance'}>
                <Image
                    src={'wish-simulator/assets/epitomized-path-modal.webp'}
                    width={1200}
                    height={675}
                    alt={"Модальное окно системы 'Путь воплощения'"}
                    draggable={false}
                    className={'w-[130vh]'}
                />
                <p className={'absolute top-[7.5%] left-[11%] text-[#84633e] text-xl xs:text-2xl'}>
                    Путь воплощения
                </p>
                <div
                    className={
                        'absolute top-[20%] left-[8%] w-[37%] h-[72%] overflow-y-scroll genshin-scrollbar'
                    }
                >
                    <div className={'text-[#a68e75] text-xl/normal [&_em]:text-[#e9b56b] [&_em]:not-italic'}>
                        <p>
                            Путь воплощения - это механика, включённая в текущий цикл молитвы &quot;Воплощение
                            божества&quot;:
                        </p>
                        <ul className={'list-disc list-inside'}>
                            <li>
                                После установки курса на желаемое оружие, если вы&nbsp;
                                <em>получите оружие 5★, которое не соответствует вашему выбору</em>, вы
                                получите 1 очко Судьбы.
                            </li>
                            <li>
                                Когда вы наберёте достаточно очков Судьбы, ваше следующее оружие 5★ будет тем,
                                что вы выбрали с помощью Пути воплощения.
                            </li>
                            <li>
                                <em>
                                    После получения оружия Пути воплощения молитвы &quot;Воплощение
                                    божества&quot; ваши очки Судьбы будут сброшены
                                </em>
                                .
                            </li>
                            <li>Если вы не выберете оружие, очки Судьбы не будут накапливаться.</li>
                            <li>
                                Вы можете изменить или отменить свой выбор.
                                <em>Это сбросит накопленные вами очки Судьбы</em>.
                            </li>
                            <li>
                                <em>
                                    Накопленные вам очки Судьбы также обнулятся, когда текущий цикл молитвы
                                    &quot;Воплощение божества&quot; закончится
                                </em>
                                .
                            </li>
                        </ul>
                    </div>
                </div>
                <svg
                    className={'z-10 group absolute w-8 top-[3%] right-[2%] xs:w-12'}
                    onClick={closeModal}
                    transform="rotate(45)"
                    fill="#000000"
                    stroke="#000000"
                    strokeWidth="0.00016"
                    version="1.1"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className={'transition group-hover:fill-[#495366] group-active:fill-[#bebebe]'}
                        d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
                        fill="#707783"
                    />
                </svg>
                <div
                    className={
                        'absolute top-0 right-0 flex items-center justify-around flex-col h-full w-1/2'
                    }
                >
                    {epitomizedStats ? (
                        <>
                            <Image
                                src={'wish-simulator/assets/epitomized-path-exists.webp'}
                                fill
                                alt={'Выбранное оружие пути воплощения'}
                                draggable={false}
                                className={'absolute h-full w-auto'}
                            />
                            <p className={'z-10 text-[#495366] text-2xl xs:text-3xl'}>Выбранное оружие</p>
                            <div className={'flex justify-center mt-3 items-center w-[70%] h-[30%]'}>
                                <WeaponPreview
                                    currentEpitomizedWeapon={epitomizedStats.weaponId}
                                    setEpitomizedWeapon={undefined}
                                    weaponId={epitomizedStats.weaponId}
                                />
                            </div>
                            <p className={'z-10 text-2xl text-[#495366]'}>
                                Очки Судьбы:&nbsp;
                                <em className={'text-[#f39000] not-italic'}>{epitomizedStats.count}</em>
                                /2
                            </p>
                            <button
                                className={
                                    'z-10 group w-72 py-2 flex items-center cursor-genshin text-[#ece5d8] text-xl bg-[#4a5366] transition rounded-full hover:ring-4 hover:ring-[#ffe6b2] active:bg-[#ffeccb] active:ring-[#b5b2ae] disabled:bg-opacity-0 disabled:ring-2 disabled:ring-[#d4d2d0] disabled:text-[#d3d0ca]'
                                }
                                onClick={() => setResetIsOpen(true)}
                            >
                                <div
                                    className={
                                        'flex justify-center items-center ml-2 size-8 bg-[#313131] rounded-full group-active:opacity-50'
                                    }
                                >
                                    <svg
                                        className={'h-3/5'}
                                        fill="#98cb33"
                                        stroke="#98cb33"
                                        strokeWidth="0.019200000000000002"
                                        viewBox="0 0 1920 1920"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <p className={'mx-auto'}>Отменить курс</p>
                            </button>
                        </>
                    ) : (
                        <>
                            <p className={'text-[#495366] text-2xl xs:text-3xl'}>Выбрать оружие</p>
                            <div className={'flex justify-center items-center gap-6 w-[70%] h-[30%]'}>
                                {[weaponBanner.firstMainWeaponId, weaponBanner.secondMainWeaponId].map(
                                    (mainWeapon) => (
                                        <WeaponPreview
                                            key={mainWeapon}
                                            currentEpitomizedWeapon={epitomizedWeapon}
                                            setEpitomizedWeapon={() => setEpitomizedWeapon(mainWeapon)}
                                            weaponId={mainWeapon}
                                        />
                                    )
                                )}
                            </div>
                            <p className={'-translate-y-8 text-center text-xl text-[#495366]'}>
                                Курс на предмет: <br />
                                <em className={'text-[#f39000] not-italic'}>
                                    {weapons.find((weapon) => weapon.id === epitomizedWeapon)?.title}
                                </em>
                            </p>
                            <Confirm
                                title={'Выбрать курс'}
                                handler={() => {
                                    const newEpitomizedPath = {
                                        ...epitomizedPath,
                                        [weaponBanner.id]: {
                                            weaponId: epitomizedWeapon,
                                            count: 0,
                                        },
                                    };
                                    setEpitomizedPath(newEpitomizedPath);
                                    localStorage.setItem('epitomizedPath', JSON.stringify(newEpitomizedPath));
                                }}
                                disabledCondition={false}
                            />
                        </>
                    )}
                </div>
                {resetIsOpen && (
                    <ResetEpitomizedPath
                        closeResetModal={() => setResetIsOpen(false)}
                        confirmReset={resetEpitomizedPath}
                    />
                )}
            </div>
        </section>
    );
};

export default EpitomizedPathModal;
