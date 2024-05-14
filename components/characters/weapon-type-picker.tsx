import Image from 'next/image';
import { WeaponType } from '@/lib/types';

const WeaponTypePicker = ({
    activeWeaponType,
    setActiveWeaponType,
}: {
    activeWeaponType: WeaponType | null;
    setActiveWeaponType: (weaponType: WeaponType | null) => void;
}) => {
    const weaponTypes: WeaponType[] = ['Sword', 'Bow', 'Catalyst', 'Polearm', 'Claymore'];

    return (
        <div className={'space-y-1 border-black max-xs:py-4 max-xs:border-y xs:border-x-2 xs:px-4'}>
            <p>Тип оружия:</p>
            <div className={'flex gap-2'}>
                {weaponTypes.map((currentWeaponType) => (
                    <Image
                        key={currentWeaponType}
                        onClick={() =>
                            setActiveWeaponType(
                                activeWeaponType === currentWeaponType ? null : currentWeaponType
                            )
                        }
                        src={`weapons/icons/${currentWeaponType}.webp`}
                        alt={currentWeaponType}
                        width={80}
                        height={80}
                        className={`size-24 rounded-xl transition hover:saturate-200 hover:drop-shadow-[0_1px_10px_#000000] xs:size-16 ${
                            activeWeaponType === currentWeaponType && 'ring-2 ring-blue-500'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeaponTypePicker;
