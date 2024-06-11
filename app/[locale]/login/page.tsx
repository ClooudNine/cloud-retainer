import { Suspense } from 'react';
import Logo from '@/components/main/logo';
import Image from 'next/image';
import LoginForm from '@/components/auth/login-form';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <main className={'size-full flex justify-center items-center'}>
            <Logo styles={'absolute top-12 left-12'} />
            <Image
                src={'common/xianyun-main.webp'}
                alt={'Xianyun'}
                fill
                className={'-z-10 object-contain object-right-bottom'}
            />
            <Suspense>
                <LoginForm />
            </Suspense>
        </main>
    );
}
