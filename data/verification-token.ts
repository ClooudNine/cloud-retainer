import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { verificationToken } from '@/lib/db/schema';

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verToken = await db.query.verificationToken.findFirst({
            where: eq(verificationToken.token, token),
        });

        return verToken;
    } catch {
        return null;
    }
};
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verToken = await db.query.verificationToken.findFirst({
            where: eq(verificationToken.email, email),
        });

        return verToken;
    } catch {
        return null;
    }
};
