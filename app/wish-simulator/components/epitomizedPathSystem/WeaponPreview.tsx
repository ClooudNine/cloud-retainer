import Image from 'next/image';
import fiveStarItemBackground from '@/public/common/items-backgrounds-by-rarity/background-item-5-star.webp';
import star from '@/public/common/star.webp';
import { useBannerContext } from '@/app/wish-simulator/BannerProvider';
import clsx from 'clsx';
import { Weapon } from '@/lib/db/schema';

const WeaponPreview = ({
    currentEpitomizedWeapon,
    setEpitomizedWeapon,
    weaponId,
}: {
    currentEpitomizedWeapon: number | null;
    setEpitomizedWeapon: (() => void) | undefined;
    weaponId: number;
}) => {
    const { weapons } = useBannerContext();

    const weapon = weapons.find((weapon) => weapon.id === weaponId) as Weapon;

    const weaponPreviewClasses = clsx(
        'relative w-[32%] bg-[#e9e5dc] rounded transition active:scale-95 xs:h-4/5',
        {
            'scale-105 border-2 border-y-[#c0ff40] lg:border-4':
                currentEpitomizedWeapon === weaponId &&
                typeof setEpitomizedWeapon !== 'undefined',
            'hover:ring-2 hover:ring-white hover:scale-105 lg:hover:ring-4':
                currentEpitomizedWeapon !== weaponId ||
                typeof setEpitomizedWeapon !== 'undefined',
        }
    );

    return (
        <div className={weaponPreviewClasses} onClick={setEpitomizedWeapon}>
            <Image
                src={fiveStarItemBackground}
                alt={'Фон предмета пятизвёздочной редкости'}
                quality={100}
                draggable={false}
                className={'w-full rounded-t rounded-br-3xl'}
            />
            {currentEpitomizedWeapon === weaponId &&
                typeof setEpitomizedWeapon !== 'undefined' && (
                    <p
                        className={
                            'z-10 absolute text-[#6c900d] text-xs size-6 flex justify-center items-center bg-[#c0ff40] rounded -top-0.5 right-0'
                        }
                    >
                        &#10004;
                    </p>
                )}
            <Image
                src={`/weapons/portraits/${weapon.title}.webp`}
                alt={'Иконка оружия ' + weapon.title}
                width={130}
                height={130}
                quality={100}
                draggable={false}
                className={'w-full absolute top-0'}
            />
            <div className={'flex justify-center -mt-2'}>
                {Array.from(Array(Number(weapon.rare)).keys()).map((number) => (
                    <Image
                        key={number}
                        src={star}
                        alt={'Звезда'}
                        quality={100}
                        draggable={false}
                        className={'w-4'}
                    />
                ))}
            </div>
            <p className={'truncate text-sm text-[#495366]'}>{weapon.title}</p>
        </div>
    );
};

export default WeaponPreview;
