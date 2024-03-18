import { Banners } from '@/lib/banners';
import { Phases } from '@/lib/db/schema';
import Image from 'next/image';
import { getGroupedBanners } from '@/lib/wish-simulator';
import WishCrossIcon from '@/components/icons/wish-cross';

const ChooseVersion = ({
    allBanners,
    switchVersion,
    closeChooseVersion,
}: {
    allBanners: Banners[];
    switchVersion: (version: number, phase: Phases) => void;
    closeChooseVersion: () => void;
}) => {
    const groupedBanners = getGroupedBanners(allBanners);

    return (
        <section
            className={
                'z-20 absolute w-full h-full bg-black/70 flex justify-center items-center'
            }
        >
            <div
                className={
                    'relative w-[100vh] h-[70vh] mx-8 bg-amber-50 rounded-lg flex flex-col items-center gap-4 animate-modal-appearance'
                }
            >
                <button
                    className={
                        'absolute transition duration-500 cursor-genshin right-2 top-2 rounded-full ring-2 p-1 ring-black hover:rotate-180'
                    }
                    onClick={closeChooseVersion}
                >
                    <WishCrossIcon fillColor={'#000000'} />
                </button>
                <p className={'mt-4 text-2xl'}>Выберите версию и фазу обновления:</p>
                <div className={'w-[95%] rounded-xl overflow-y-auto genshin-scrollbar'}>
                    <table className={'w-full overflow-hidden text-center'}>
                        <thead className={'bg-amber-200'}>
                            <tr className={'text-center'}>
                                <td className={'p-4'}>Версия</td>
                                <td>Фаза</td>
                                <td>Персонажи</td>
                                <td>Оружие</td>
                                <td>Выбрать набор</td>
                            </tr>
                        </thead>
                        <tbody className={'bg-amber-100'}>
                            {Object.keys(groupedBanners).map((key) => {
                                const [version, phase] = key.split('-');
                                return (
                                    <tr
                                        key={key}
                                        className={'border-b-2 border-b-amber-900'}
                                    >
                                        <td>{version}</td>
                                        <td>{phase}</td>
                                        <td className={'p-4'}>
                                            <div
                                                className={
                                                    'flex justify-center items-center gap-2'
                                                }
                                            >
                                                {groupedBanners[key].map((banner) => {
                                                    if ('mainCharacterId' in banner)
                                                        return (
                                                            <Image
                                                                key={
                                                                    banner.character.name
                                                                }
                                                                src={`characters/profiles/${banner.character.name}.webp`}
                                                                alt={`Портрет персонажа ${banner.character.name}`}
                                                                draggable={false}
                                                                width={100}
                                                                height={100}
                                                                className={'w-20'}
                                                            />
                                                        );
                                                })}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    'flex items-center justify-center'
                                                }
                                            >
                                                {groupedBanners[key].map((banner) => {
                                                    if ('firstMainWeaponId' in banner) {
                                                        const mainWeapons = [
                                                            banner.firstMainWeapon,
                                                            banner.secondMainWeapon,
                                                        ];

                                                        return mainWeapons.map(
                                                            (mainWeapon) => (
                                                                <Image
                                                                    key={mainWeapon.title}
                                                                    src={`weapons/portraits/${mainWeapon.title}.webp`}
                                                                    alt={`Портрет оружия ${mainWeapon.title}`}
                                                                    draggable={false}
                                                                    width={100}
                                                                    height={100}
                                                                    className={'w-20'}
                                                                />
                                                            )
                                                        );
                                                    }
                                                })}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    switchVersion(
                                                        Number(version),
                                                        phase as Phases
                                                    );
                                                }}
                                                className={
                                                    'cursor-genshin text-white bg-blue-700 px-2 py-1 rounded-lg transition hover:bg-green-600 hover:-translate-y-0.5'
                                                }
                                            >
                                                Выбрать
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ChooseVersion;
