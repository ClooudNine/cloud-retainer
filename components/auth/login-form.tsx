'use client';
import { useSearchParams } from 'next/navigation';
import { AuthState } from '@/actions/register';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/actions/login';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { CircleCheck, Eye, EyeOff, TriangleAlert } from 'lucide-react';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? ['Email уже используется для авторизации через учётную запись!']
            : null;

    const initialState: AuthState | undefined = { error: urlError, success: null };
    const [state, dispatch] = useFormState(login, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            action={dispatch}
            className={
                'flex flex-col justify-evenly items-center gap-4 py-4 bg-gray-200/80 w-[30rem] rounded-lg'
            }
        >
            <h2 className={'text-3xl mx-auto'}>Вход</h2>
            <label className={'w-[90%] space-y-2'}>
                <p>Email</p>
                <input
                    name={'email'}
                    type={'email'}
                    placeholder={'example@gmail.com'}
                    required={true}
                    className={'border-2 border-gray-500 rounded-lg w-full h-8'}
                />
            </label>
            <label className={'relative w-[90%] space-y-2'}>
                <p>Пароль</p>
                <input
                    name={'password'}
                    type={showPassword ? 'text' : 'password'}
                    minLength={8}
                    placeholder={'********'}
                    required={true}
                    className={'-z-10 border-2 border-gray-500 rounded-lg w-full h-8'}
                />
                <button
                    type={'button'}
                    className={'absolute top-[36%] right-2'}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <Eye className={'size-8'} />
                    ) : (
                        <EyeOff className={'size-8'} />
                    )}
                </button>
            </label>
            <Link
                href={'/register'}
                className={
                    'flex items-center underline transition-all duration-500 hover:tracking-widest'
                }
            >
                Нет аккаунта? Создать →
            </Link>
            {state?.error && (
                <div
                    className={
                        'flex items-center gap-4 bg-red-200 px-8 py-2 rounded-lg text-center w-[90%] h-fit'
                    }
                >
                    <TriangleAlert className={'size-8'} />
                    <div className={'flex-1'}>
                        {state.error.map((message) => (
                            <p key={message}>{message || urlError}</p>
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
                    <p className={'flex-1'}>{state.success}</p>
                </div>
            )}
            <GoogleButton />
            <LoginButton />
        </form>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type={'submit'}
            disabled={pending}
            className={
                'rounded-lg bg-green-300 px-12 py-2 transition duration-500 hover:bg-green-600 hover:-translate-y-1 hover:text-white disabled:opacity-20'
            }
        >
            Войти
        </button>
    );
}

function GoogleButton() {
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
                alt={'Вход с помощью Google'}
                width={30}
                height={30}
            />
            Войти с помощью Google
        </button>
    );
}

export default LoginForm;
