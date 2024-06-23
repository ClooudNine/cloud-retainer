'use client';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';
import { useTranslations } from 'next-intl';

const AchievementsCounter = () => {
    const t = useTranslations('main');
    const { achievements, completed } = useAchievementsContext();

    return (
        <p className={'max-xl:text-2xl'}>
            {t('all-complete')}: {completed.length}/
            {achievements.reduce((sum, chapter) => sum + chapter.achievements.length, 0)}
        </p>
    );
};

export default AchievementsCounter;
