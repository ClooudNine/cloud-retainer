import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Achievement } from '@/lib/types';

const AchievementsButton = ({ achievement }: { achievement: Achievement }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    key={achievement.title}
                    className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}
                >
                    {achievement.title}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default AchievementsButton;
