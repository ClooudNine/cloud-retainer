import { db } from '@/lib/db';
import { materials } from '@/lib/db/schema';

export const getAllMaterials = async () => {
    try {
        const allMaterials = await db.select().from(materials);

        return allMaterials;
    } catch {
        return null;
    }
};
