import { Character } from '@/app/types/character';
import { Weapon } from '@/app/types/weapon';
import { Rares } from '@/app/types/common';

const getItemsByRarity = (items: (Character | Weapon)[], rare: Rares) => {
	return items.filter(item => item.rare === rare);
};
const getRandomItem = (items: (Character | Weapon)[]) => {
	return items[Math.floor(Math.random() * items.length)];
};
const dropItem = (items: (Character | Weapon)[], rare: Rares) => {
	return getRandomItem(getItemsByRarity(items, rare));
};
export const wish = (items: (Character | Weapon)[]) => {
	const randomNumber = Math.random();
	if (randomNumber <= 0.943) {
		return dropItem(items, 3);
	} else if (randomNumber > 0.943 && randomNumber <= 0.994) {
		return dropItem(items, 4);
	} else {
		return dropItem(items, 5);
	}
};
