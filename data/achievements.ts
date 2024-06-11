import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { userAchievements } from '@/lib/db/schema';

export const getAllAchievements = async () => {
    const allAchievements = await db.query.achievementsChapters.findMany({
        with: { achievements: true },
    });

    return allAchievements;
};

export const getCompletedAchievements = async (userId: string | undefined) => {
    if (!userId) return [];

    const completedAchievements = await db.query.userAchievements.findMany({
        where: eq(userAchievements.userId, userId),
        with: { achievement: true },
    });

    return completedAchievements;
};
