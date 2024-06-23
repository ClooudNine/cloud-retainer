import { Achievement } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import AchievementsButton from '@/components/admin/achievements/achievements-button';

const AchievementsList = ({ achievements }: { achievements: Achievement[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {achievements.map((achievement) => (
                    <AchievementsButton key={achievement.title} achievement={achievement} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default AchievementsList;
