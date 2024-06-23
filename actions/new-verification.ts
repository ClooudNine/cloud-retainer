'use server';

import { getVerificationTokenByToken } from '@/data/verification-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { users, verificationToken } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: 'not-token' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'user-with-mail-not-found' };
    }

    await db
        .update(users)
        .set({ emailVerified: new Date(), email: existingToken.email })
        .where(eq(users.id, existingUser.id));

    await db.delete(verificationToken).where(eq(verificationToken.id, existingToken.id));

    return { success: 'confirm-success' };
};
