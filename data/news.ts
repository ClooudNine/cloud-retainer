import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { news } from '@/lib/db/schema';

export const getNewById = async (id: number) => {
    try {
        const newById = await db.query.news.findFirst({ where: eq(news.id, id) });

        return newById;
    } catch {
        return null;
    }
};

export const getLastNews = async () => {
    try {
        const lastNews = await db.query.news.findMany({ limit: 3 });

        return lastNews;
    } catch {
        return null;
    }
};

export const getAllNews = async () => {
    try {
        const allNews = await db.query.news.findMany();

        return allNews;
    } catch {
        return null;
    }
};
