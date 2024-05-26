import { db } from '@/lib/db';

export const getAllAchievements = async () => {
    const allAchievements = await db.query.achievementsChapters.findMany({
        with: { achievements: true },
    });

    return allAchievements;
};
