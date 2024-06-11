import { Achievement } from '@/lib/types';

export const groupAchievements = (achievements: Achievement[]) => {
    return achievements.reduce<{ [title: string]: Achievement[] }>((acc, achievement) => {
        if (!acc[achievement.title]) {
            acc[achievement.title] = [];
        }
        acc[achievement.title].push(achievement);
        return acc;
    }, {});
};
