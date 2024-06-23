import { db } from '@/lib/db';

export const getAllArtifacts = async () => {
    const allArtifacts = await db.query.artifactsSet.findMany();

    return allArtifacts;
};
