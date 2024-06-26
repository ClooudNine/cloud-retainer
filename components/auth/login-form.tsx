'use client';
import { Link } from '@/navigation';
import { AuthState } from '@/actions/register';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/actions/login';
import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { CircleCheck, Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const LoginForm = () => {
    const t = useTranslations('auth');
    const searchParams = useSearchParams();
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? [t('not-linked')] : null;

    const initialState: AuthState | undefined = { error: urlError, success: null };
    const [state, dispatch] = useFormState(login, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            action={dispatch}
            className={
                'flex flex-col justify-evenly items-center gap-4 py-4 bg-gray-200/80 w-[35rem] rounded-lg shadow-2xl max-xl:text-2xl'
            }
        >
            <h1 className={'text-5xl xs:text-3xl'}>{t('title')}</h1>
            <label className={'w-[90%] space-y-2'}>
                <p>Email</p>
                <input
                    name={'email'}
                    type={'email'}
                    placeholder={'example@mail.com'}
                    required={true}
                    className={'border-2 border-gray-500 rounded w-full'}
                />
            </label>
            <label className={'relative w-[90%] space-y-2'}>
                <p>{t('password')}</p>
                <input
                    name={'password'}
                    type={showPassword ? 'text' : 'password'}
                    minLength={8}
                    placeholder={'********'}
                    required={true}
                    className={'border-2 border-gray-500 rounded w-full'}
                />
                <button
                    type={'button'}
                    className={'absolute right-2'}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <Eye className={'size-10 xl:size-7'} />
                    ) : (
                        <EyeOff className={'size-10 xl:size-7'} />
                    )}
                </button>
            </label>
            <Link
                href={'/register'}
                className={'underline transition-all duration-500 hover:tracking-widest'}
            >
                {t('nothing-account')}
            </Link>
            {state?.error && (
                <div
                    className={'flex items-center bg-red-200 px-8 py-2 rounded-lg text-center w-[90%] h-fit'}
                >
                    <TriangleAlert className={'size-8'} />
                    <div className={'flex-1'}>
                        {state.error.map((message) => (
                            <p key={message}>{t(message) || urlError}</p>
                        ))}
                    </div>
                </div>
            )}
            {state?.success && (
                <div
                    className={
                        'flex items-center gap-4 bg-emerald-200 px-8 py-2 rounded-lg text-center w-[90%]'
                    }
                >
                    <CircleCheck className={'size-8'} />
                    <p className={'flex-1'}>{t(state.success)}</p>
                </div>
            )}
            <GoogleButton />
            <LoginButton />
        </form>
    );
};

function LoginButton() {
    const t = useTranslations('auth');
    const { pending } = useFormStatus();

    return (
        <button
            type={'submit'}
            disabled={pending}
            className={
                'rounded-lg bg-green-300 px-12 py-2 transition duration-500 hover:bg-green-600 hover:-translate-y-1 hover:text-white disabled:opacity-20'
            }
        >
            {t('login')}
        </button>
    );
}

function GoogleButton() {
    const t = useTranslations('auth');
    const { pending } = useFormStatus();

    return (
        <button
            type={'button'}
            disabled={pending}
            onClick={() => signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT })}
            className={
                'rounded-lg bg-white flex items-center gap-4 px-12 py-2 transition duration-500 hover:bg-black hover:-translate-y-1 hover:text-white disabled:opacity-20'
            }
        >
            <Image
                src={'common/google.webp'}
                alt={'Google logo'}
                width={30}
                height={30}
                className={'size-8'}
            />
            {t('google-sign-up')}
        </button>
    );
}

export default LoginForm;
