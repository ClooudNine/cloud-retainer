import { ScrollArea } from '@/components/ui/scroll-area';
import { Boss } from '@/lib/types';
import BossesButton from '@/components/admin/bosses/bosses-button';

const BossesList = ({ bosses }: { bosses: Boss[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {bosses.map((boss) => (
                    <BossesButton key={boss.name} boss={boss} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default BossesList;
