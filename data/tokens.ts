import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { db } from '@/lib/db';
import { verificationToken } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db
            .delete(verificationToken)
            .where(eq(verificationToken.id, existingToken.id));
    }

    const verToken = await db
        .insert(verificationToken)
        .values({ email: email, token: token, expires: expires })
        .returning();

    return verToken;
};
