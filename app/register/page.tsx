'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { AuthState, register } from '@/actions/register';
import Logo from '@/components/main/logo';
import { CircleCheck, Eye, EyeOff, TriangleAlert } from 'lucide-react';

export default function Register() {
    const initialState: AuthState = { error: null, success: null };
    const [state, dispatch] = useFormState(register, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className={'w-full h-full flex justify-center items-center'}>
            <Logo styles={'absolute top-12 left-12'} />
            <Image
                src={'common/xianyun-main.webp'}
                alt={'Xianyun'}
                fill
                className={'-z-10 object-contain object-right-bottom'}
            />
            <form
                action={dispatch}
                className={
                    'flex flex-col justify-evenly items-center gap-4 py-4 bg-gray-200/80 w-[30rem] rounded-lg'
                }
            >
                <h2 className={'text-3xl mx-auto'}>Регистрация</h2>
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
                <label className={'w-[90%] space-y-2'}>
                    <p>Имя</p>
                    <input
                        name={'username'}
                        minLength={2}
                        placeholder={'username'}
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
                <label className={'w-[90%] space-y-2'}>
                    <p>Подтвердите пароль</p>
                    <input
                        name={'repeatPassword'}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={'********'}
                        required={true}
                        className={'border-2 border-gray-500 rounded-lg w-full h-8'}
                    />
                </label>
                <Link
                    href={'/login'}
                    className={
                        'flex items-center underline transition-all duration-500 hover:tracking-widest'
                    }
                >
                    Есть аккаунт? Войти →
                </Link>
                {state.error && (
                    <div
                        className={
                            'flex items-center gap-4 bg-red-200 px-8 py-2 rounded-lg text-center w-[90%] h-fit'
                        }
                    >
                        <TriangleAlert className={'size-8'} />
                        <div className={'flex-1'}>
                            {state.error.map((message) => (
                                <p key={message}>{message}</p>
                            ))}
                        </div>
                    </div>
                )}
                {state.success && (
                    <div
                        className={
                            'flex items-center gap-4 bg-emerald-200 px-8 py-2 rounded-lg text-center w-[90%]'
                        }
                    >
                        <CircleCheck className={'size-8'} />
                        <p className={'flex-1'}>{state.success}</p>
                    </div>
                )}
                <RegisterButton />
            </form>
        </main>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type={'submit'}
            disabled={pending}
            className={
                'rounded-lg bg-green-300 px-12 py-2 transition duration-500 hover:bg-green-600 hover:-translate-y-1 hover:text-white disabled:opacity-20'
            }
        >
            Отправить
        </button>
    );
}
