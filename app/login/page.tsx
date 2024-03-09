import { Suspense } from 'react';
import Logo from '@/components/main-page/logo';
import Image from 'next/image';
import xianyun from '@/public/common/Xianyun_Profile.webp';
import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
    return (
        <main className={'w-full h-full flex justify-center items-center'}>
            <Logo styles={'absolute top-12 left-12'} />
            <Image
                src={xianyun}
                alt={'Xianyun'}
                fill
                quality={100}
                className={'-z-10 object-contain object-right-bottom'}
            />
            <Suspense>
                <LoginForm />
            </Suspense>
        </main>
    );
}
