import type { NextAuthConfig } from 'next-auth';
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { NextResponse } from 'next/server';

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        authorized({ auth, request }) {
            const { pathname } = request.nextUrl;
            const isAuthRoute = authRoutes.some((route) => pathname.endsWith(route));

            if (isAuthRoute) {
                const isLoggedIn = !!auth?.user;
                if (isLoggedIn) {
                    const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl);
                    return NextResponse.redirect(redirectUrl);
                }

                return true;
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
