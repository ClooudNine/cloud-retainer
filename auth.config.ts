import type { NextAuthConfig } from 'next-auth';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const isApiPathRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
            const isAdminRoute = nextUrl.pathname.startsWith('/admin');
            const isAuthRoute = authRoutes.includes(nextUrl.pathname);

            if (isApiPathRoute) {
                return true;
            }

            if (isAuthRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                }
                return true;
            }

            if (isAdminRoute) {
                if (!isLoggedIn || auth?.user.role !== 'Admin')
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
