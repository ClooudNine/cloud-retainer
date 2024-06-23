'use server';
import bcrypt from 'bcrypt';
import { users } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { RegisterSchema } from '@/lib/form-shemas';

export type AuthState = {
    error?: string[] | null;
    success?: string | null;
};
export const register = async (prevState: AuthState, formData: FormData) => {
    if (formData.get('repeatPassword') !== formData.get('password')) {
        return { error: ['password-not-match'] };
    }

    const validatedFields = RegisterSchema.safeParse({
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors.map((error) => error.message) };
    }

    const { email, username, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: ['email-exist'] };
    }

    await db.insert(users).values({ name: username, email: email, password: hashedPassword });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);

    return { success: 'mail-send-notification' };
};
