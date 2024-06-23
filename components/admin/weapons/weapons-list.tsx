import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';
import { Weapon } from '@/lib/types';
import WeaponButton from '@/components/admin/weapons/weapon-button';

const WeaponsList = ({ weapons }: { weapons: Weapon[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новое оружие</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {weapons.map((weapon) => (
                        <WeaponButton key={weapon.title} weapon={weapon} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default WeaponsList;
