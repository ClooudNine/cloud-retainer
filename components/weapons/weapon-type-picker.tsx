import Image from 'next/image';
import { WeaponType } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { weaponTypesEnum } from '@/lib/db/schema';

const WeaponTypePicker = ({
    activeWeaponType,
    setActiveWeaponType,
}: {
    activeWeaponType: WeaponType | null;
    setActiveWeaponType: (weaponType: WeaponType | null) => void;
}) => {
    const t = useTranslations();

    return (
        <div className={'space-y-1 border-black max-lg:py-4 max-lg:border-y lg:border-x-2 lg:px-4'}>
            <p>{t('main.weapon-type')}:</p>
            <div className={'flex gap-2'}>
                {weaponTypesEnum.enumValues.map((weaponType) => (
                    <Image
                        key={weaponType}
                        onClick={() =>
                            setActiveWeaponType(activeWeaponType === weaponType ? null : weaponType)
                        }
                        src={`weapons/icons/${weaponType}.webp`}
                        alt={t(`weapon-types.${weaponType}`)}
                        width={70}
                        height={70}
                        className={`size-24 rounded-xl transition hover:drop-shadow-[0_1px_5px_#000000] lg:size-16 ${
                            activeWeaponType === weaponType && 'ring-2 ring-blue-500'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeaponTypePicker;
