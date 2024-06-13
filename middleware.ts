import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/navigation';
import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

interface AppRouteHandlerFnContext {
    params?: Record<string, string | string[]>;
}

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'ru',
});

export const middleware = (request: NextRequest, event: AppRouteHandlerFnContext): NextResponse => {
    return NextAuth(authConfig).auth(() => {
        return intlMiddleware(request);
    })(request, event) as NextResponse;
};

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
