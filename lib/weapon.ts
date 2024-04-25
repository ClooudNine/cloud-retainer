import { Weapon } from '@/lib/types';

export const getWeaponById = (id: number, weapons: Weapon[]) => {
    const weapon = weapons.find((weapon) => weapon.id === id);

    return weapon;
};
