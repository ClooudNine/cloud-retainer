import type { NextAuthConfig } from 'next-auth';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/navigation';

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'ru',
});

export const authConfig = {
    pages: { signIn: '/login' },
    callbacks: {
        authorized({ auth, request }) {
            const { pathname, searchParams } = request.nextUrl;

            const isApiPathRoute = pathname.startsWith(apiAuthPrefix);
            const isAuthRoute = authRoutes.some((route) => pathname.endsWith(route));

            if (isApiPathRoute) {
                return true;
            }

            if (isAuthRoute) {
                const isLoggedIn = !!auth?.user;
                if (isLoggedIn) {
                    const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl);
                    redirectUrl.search = searchParams.toString();
                    return NextResponse.redirect(redirectUrl);
                }

                const response = intlMiddleware(request);
                let headersList = response.headers.get('x-middleware-override-headers')?.split(',');
                const headersToRemove = [
                    'cf-connecting-ip',
                    'x-forwarded-for',
                    'x-middleware-request-cf-connecting-ip',
                ];

                headersList = headersList?.filter((header) => !headersToRemove.includes(header));
                response.headers.set('x-middleware-override-headers', headersList?.join(',') as string);

                response.headers.delete('x-middleware-request-cf-connecting-ip');
                response.headers.delete('x-middleware-request-x-forwarded-for');

                console.log(response);

                return response;
            }

            const response = intlMiddleware(request);
            let headersList = response.headers.get('x-middleware-override-headers')?.split(',');
            const headersToRemove = [
                'cf-connecting-ip',
                'x-forwarded-for',
                'x-middleware-request-cf-connecting-ip',
            ];

            headersList = headersList?.filter((header) => !headersToRemove.includes(header));
            response.headers.set('x-middleware-override-headers', headersList?.join(',') as string);

            response.headers.delete('x-middleware-request-cf-connecting-ip');
            response.headers.delete('x-middleware-request-x-forwarded-for');

            console.log(response);

            return response;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
