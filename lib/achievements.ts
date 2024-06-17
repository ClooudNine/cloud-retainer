import { Achievement } from '@/lib/types';
import { addEventToFavorite, removeEventsFromFavorite } from '@/actions/events';
import { toast } from 'sonner';

export const groupAchievements = (achievements: Achievement[]) => {
    return achievements.reduce<{ [title: string]: Achievement[] }>((acc, achievement) => {
        if (!acc[achievement.title]) {
            acc[achievement.title] = [];
        }
        acc[achievement.title].push(achievement);
        return acc;
    }, {});
};

export const addToFavorite = async (eventId: number) => {
    const result = await addEventToFavorite(eventId);
    const message = result.message;

    if (result.status === 'success') {
        toast.success(message);
    } else if (result.status === 'warning') {
        toast.warning(message);
    } else {
        toast.error(message);
    }
};

export const removeFromFavorite = async (eventId: number) => {
    const result = await removeEventsFromFavorite(eventId);
    const message = result.message;

    if (result.status === 'success') {
        toast.success(message);
    } else if (result.status === 'warning') {
        toast.warning(message);
    } else {
        toast.error(message);
    }
};
