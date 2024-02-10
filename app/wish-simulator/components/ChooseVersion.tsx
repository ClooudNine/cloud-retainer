import { Banners } from '@/lib/banners';
import { CharacterBanner, Phases, WeaponBanner } from '@/lib/db/schema';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
import Image from 'next/image';
const groupBanners = (banners: Banners[]) => {
    const groupBanners: { [key: string]: (CharacterBanner | WeaponBanner)[] } = {};
    banners.forEach((banner) => {
        if (banner.type === 'Novice Wish' || 'previewVersion' in banner) {
            return;
        }
        const key = `${banner.version}-${banner.phase}`;
        if (!groupBanners[key]) {
            groupBanners[key] = [];
        }
        groupBanners[key].push(banner);
    });
    return groupBanners;
};
const ChooseVersion = ({
    allBanners,
    switchVersion,
    closeChooseVersion,
}: {
    allBanners: Banners[];
    switchVersion: (version: number, phase: Phases) => void;
    closeChooseVersion: () => void;
}) => {
    const { characters, weapons } = useBannerContext();

    const groupedBanners = groupBanners(allBanners);

    return (
        <section
            className={
                'z-20 absolute w-full h-full bg-black/70 flex justify-center items-center'
            }
        >
            <div
                className={
                    'relative w-[100vh] max-h-[70vh] mx-8 h-1/2 bg-amber-50 rounded-xl flex flex-col items-center gap-4 animate-modal-appearance xs:h-[90%]'
                }
            >
                <button
                    className={
                        'absolute transition cursor-genshin right-2 top-2 hover:rotate-180'
                    }
                    onClick={closeChooseVersion}
                >
                    <svg
                        className={'w-9'}
                        transform="rotate(45)"
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth=".00016"
                        version="1.1"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
                            fill="#000000"
                        />
                    </svg>
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
                                                    if ('mainCharacterId' in banner) {
                                                        const mainCharacter =
                                                            characters.find(
                                                                (character) =>
                                                                    character.id ===
                                                                    banner.mainCharacterId
                                                            );
                                                        return (
                                                            <Image
                                                                key={mainCharacter?.name}
                                                                src={`/characters/profiles/${mainCharacter?.name}.webp`}
                                                                alt={`Портрет персонажа ${mainCharacter?.name}`}
                                                                quality={100}
                                                                draggable={false}
                                                                width={100}
                                                                height={100}
                                                                className={'w-20'}
                                                            />
                                                        );
                                                    }
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
                                                        const mainWeapons =
                                                            weapons.filter((weapon) =>
                                                                [
                                                                    banner.firstMainWeaponId,
                                                                    banner.secondMainWeaponId,
                                                                ].includes(weapon.id)
                                                            );
                                                        return mainWeapons.map(
                                                            (mainWeapon) => (
                                                                <Image
                                                                    key={
                                                                        mainWeapon?.title
                                                                    }
                                                                    src={`/weapons/portraits/${mainWeapon?.title}.webp`}
                                                                    alt={`Портрет оружия ${mainWeapon?.title}`}
                                                                    quality={100}
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
                                                    closeChooseVersion();
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
