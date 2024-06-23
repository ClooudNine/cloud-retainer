import { Achievement } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';
import AchievementsButton from '@/components/admin/achievements/achievements-button';

const AchievementsList = ({ achievements }: { achievements: Achievement[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новое достижение</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {achievements.map((achievement) => (
                        <AchievementsButton key={achievement.title} achievement={achievement} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default AchievementsList;
