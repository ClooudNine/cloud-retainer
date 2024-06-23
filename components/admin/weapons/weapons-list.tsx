import { ScrollArea } from '@/components/ui/scroll-area';
import { Weapon } from '@/lib/types';
import WeaponButton from '@/components/admin/weapons/weapon-button';

const WeaponsList = ({ weapons }: { weapons: Weapon[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {weapons.map((weapon) => (
                    <WeaponButton key={weapon.title} weapon={weapon} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default WeaponsList;
