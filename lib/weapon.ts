import { Weapon } from '@/lib/db/schema';

export const getWeaponById = (id: number, weapons: Weapon[]) => {
    const weapon = weapons.find((weapon) => weapon.id === id);

    return weapon;
};
