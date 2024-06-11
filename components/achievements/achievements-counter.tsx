'use client';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';

const AchievementsCounter = () => {
    const { achievements, completed } = useAchievementsContext();

    return (
        <p className={'max-xl:text-2xl'}>
            Всего достижений выполнено: {completed.length}/
            {achievements.reduce((sum, chapter) => sum + chapter.achievements.length, 0)}
        </p>
    );
};

export default AchievementsCounter;
