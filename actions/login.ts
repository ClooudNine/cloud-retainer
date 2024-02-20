'use server';
import { LoginSchema } from '@/lib/db/schema';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';
import { AuthState } from '@/actions/register';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (prevState: AuthState | undefined, formData: FormData) => {
    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors.map((error) => error.message) };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: ['Email не существует!'] };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken[0].email,
            verificationToken[0].token
        );

        return { success: 'Письмо подтверждения отправлено!' };
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: ['Неверный email или пароль!'] };
                default:
                    return { error: ['Что-то пошло не так'] };
            }
        }

        throw error;
    }
};
