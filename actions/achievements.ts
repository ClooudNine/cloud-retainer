'use server';
import { db } from '@/lib/db';
import { userAchievements } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

export const completeAchievement = async (userId: string, achievementId: number) => {
    await db.insert(userAchievements).values({ userId: userId, achievementId: achievementId });
};

export const removeCompleteAchievement = async (userId: string, achievementId: number) => {
    await db
        .delete(userAchievements)
        .where(and(eq(userAchievements.userId, userId), eq(userAchievements.achievementId, achievementId)));
};
