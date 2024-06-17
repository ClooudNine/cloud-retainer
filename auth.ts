import NextAuth, { DefaultSession } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { authConfig } from '@/auth.config';
import { getUserById } from '@/data/user';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { UserRoles } from '@/lib/types';
import { LoginSchema } from '@/lib/form-shemas';

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRoles;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: DrizzleAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
    providers: [
        Google,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await db.query.users.findFirst({
                        where: eq(users.email, email),
                    });

                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id as string);

            if (!existingUser?.emailVerified) return false;

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.name = token.name;
                session.user.image = token.image as string;
                session.user.role = token.role as UserRoles;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.name = existingUser.name;
            token.image = existingUser.image;
            token.role = existingUser.role;

            return token;
        },
    },
    events: {
        async linkAccount({ user }) {
            await db
                .update(users)
                .set({ emailVerified: new Date() })
                .where(eq(users.id, user.id as string));
        },
    },
});
