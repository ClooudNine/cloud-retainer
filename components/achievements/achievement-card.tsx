import { CircleCheck, CircleX, Eye, EyeOff, Star } from 'lucide-react';
import Image from 'next/image';
import { Achievement } from '@/lib/types';
import { toast } from 'sonner';
import { completeAchievement, removeCompleteAchievement } from '@/actions/achievements';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

const AchievementCard = ({
    achievement,
    rating,
    isOpen,
    groupLength,
    setAnimated,
}: {
    achievement: Achievement;
    rating: number;
    isOpen: boolean;
    groupLength: number;
    setAnimated: (isAnimate: boolean) => void;
}) => {
    const t = useTranslations();
    const { user, completed, setCompleted } = useAchievementsContext();

    const completeAchievementClick = async () => {
        const userId = user?.id;

        if (!userId) {
            toast.warning(t('main.achievements-warning'), { className: 'text-lg' });
            return;
        }

        if (rating === groupLength - 1) {
            setAnimated(true);
        }

        try {
            await completeAchievement(userId, achievement.id);
            setCompleted([
                ...completed,
                {
                    userId: userId,
                    achievementId: achievement.id,
                    achievedAt: new Date(),
                    achievement: achievement,
                },
            ]);
            toast.success(t('main.achievements-mark'), { className: 'text-lg' });
        } catch (error) {
            toast.error(t('main.achievements-mark-error'), { className: 'text-lg' });
        }

        setAnimated(false);
    };

    const removeCompleteAchievementClick = async () => {
        const userId = user?.id;

        if (!userId) {
            return;
        }

        if (rating === groupLength - 1) {
            setAnimated(true);
        }

        try {
            await removeCompleteAchievement(userId, achievement.id);
            setCompleted(completed.filter((item) => item.achievementId !== achievement.id));
            toast.success(t('main.achievements-unmark'), { className: 'text-lg' });
        } catch (error) {
            toast.error(t('main.achievements-unmark-error'), { className: 'text-lg' });
        }

        setAnimated(false);
    };

    const isCompleted = completed.some((ca) => ca.achievementId === achievement.id);

    const achievementClasses = clsx('flex items-center p-2 rounded-lg transition max-xs:text-xl', {
        'bg-orange-100': !isCompleted,
        'bg-emerald-200': isCompleted,
        'opacity-50 pointer-events-none': !isOpen,
    });

    return (
        <div className={achievementClasses}>
            <div className="w-[8%] rotate-180 flex flex-wrap items-center justify-center rounded-full">
                {[...Array(rating + 1)].map((_, i) => (
                    <Star key={i} className={'-rotate-180 size-6'} />
                ))}
            </div>
            <h3 className="w-[20%] ml-2">{t(`achievements.${achievement.id}.title`)}</h3>
            <p className="w-[35%] ml-4">{t(`achievements.${achievement.id}.description`)}</p>
            <div className="w-[10%] flex items-center">
                {achievement.reward}
                <Image
                    alt={t('common.primogem', { count: 1 })}
                    src={'wish-simulator/assets/primogem.webp'}
                    width={40}
                    height={40}
                    className={'size-12 drop-shadow'}
                />
            </div>
            <div className="w-[15%] flex flex-col items-center text-center">
                {achievement.hidden ? (
                    <>
                        <EyeOff className="size-8" /> {t('main.hidden-achievement')}
                    </>
                ) : (
                    <>
                        <Eye className="size-8" /> {t('main.not-hidden-achievement')}
                    </>
                )}
            </div>
            {isCompleted ? (
                <div className={'w-[10%] flex flex-col items-center justify-center text-xs xl:text-sm'}>
                    <CircleX
                        onClick={removeCompleteAchievementClick}
                        className="size-10 transition hover:stroke-red-500 active:stroke-white"
                    />
                    {completed
                        .find((c) => c.achievement.id === achievement.id)
                        ?.achievedAt.toLocaleDateString()}
                </div>
            ) : (
                <CircleCheck
                    onClick={completeAchievementClick}
                    className="w-[10%] size-10 transition hover:stroke-green-500 active:stroke-white"
                />
            )}
        </div>
    );
};

export default AchievementCard;
