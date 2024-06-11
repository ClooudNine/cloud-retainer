import AchievementCard from '@/components/achievements/achievement-card';
import { Achievement } from '@/lib/types';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';
import { useCallback, useState } from 'react';
import { clsx } from 'clsx';

const AchievementGroup = ({ group }: { group: Achievement[] }) => {
    const { completed } = useAchievementsContext();
    const [isAnimated, setIsAnimated] = useState(false);

    const groupClasses = clsx('border-2 border-black rounded-lg', {
        'animate-slide-out': isAnimated,
    });

    const isAchievementCompleted = useCallback(
        (achievementId: number) => completed.some((ca) => ca.achievement.id === achievementId),
        [completed]
    );

    return (
        <div className={groupClasses}>
            {group.map((groupedAchievement, index) => {
                const isNextCompleted = isAchievementCompleted(group[index + 1]?.id);
                const isPrevCompleted = isAchievementCompleted(group[index - 1]?.id);
                const isOpen = (!isNextCompleted && isPrevCompleted) || (index === 0 && !isNextCompleted);

                return (
                    <AchievementCard
                        key={groupedAchievement.title + '-' + index}
                        achievement={groupedAchievement}
                        rating={index}
                        isOpen={isOpen}
                        groupLength={group.length}
                        setAnimated={setIsAnimated}
                    />
                );
            })}
        </div>
    );
};

export default AchievementGroup;
