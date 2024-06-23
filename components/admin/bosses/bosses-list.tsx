import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';
import { Boss } from '@/lib/types';
import BossesButton from '@/components/admin/bosses/bosses-button';

const BossesList = ({ bosses }: { bosses: Boss[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить нового босса</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {bosses.map((boss) => (
                        <BossesButton key={boss.name} boss={boss} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default BossesList;
