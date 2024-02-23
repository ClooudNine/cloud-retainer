'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import xianyun from '@/public/common/Xianyun_Profile.webp';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import EyeOpen from '@/components/icons/eye-open';
import EyeClose from '@/components/icons/eye-close';
import Warning from '@/components/icons/warning';
import { login } from '@/actions/login';
import googleIcon from '@/public/common/google.png';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthState } from '@/actions/register';
import Success from '@/components/icons/success';

export default function Login() {
    const initialState: AuthState | undefined = { error: null, success: null };
    const [state, dispatch] = useFormState(login, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className={'w-full h-full font-genshin flex justify-center items-center'}>
            <Image
                src={xianyun}
                alt={'Xianyun'}
                fill
                quality={100}
                className={'-z-10 object-contain object-right-bottom'}
            />
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
                        {showPassword ? <EyeOpen /> : <EyeClose />}
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
                        <Warning />
                        <div className={'flex-1'}>
                            {state.error.map((message) => (
                                <p key={message}>{message}</p>
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
                        <Success />
                        <p className={'flex-1'}>{state.success}</p>
                    </div>
                )}
                <GoogleButton />
                <LoginButton />
            </form>
        </main>
    );
}

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
            <Image src={googleIcon} alt={'Google'} quality={100} />
            Войти с помощью Google
        </button>
    );
}