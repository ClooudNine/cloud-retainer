import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Achievement } from '@/lib/types';
import { useTranslations } from 'next-intl';

const AchievementsButton = ({ achievement }: { achievement: Achievement }) => {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    key={achievement.title}
                    className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}
                >
                    {t(`achievements.${achievement.id}.title`)}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default AchievementsButton;
