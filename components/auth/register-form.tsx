'use client';
import { CircleCheck, Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { Link } from '@/navigation';
import { AuthState, register } from '@/actions/register';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const RegisterForm = () => {
    const t = useTranslations();

    const initialState: AuthState = { error: null, success: null };
    const [state, dispatch] = useFormState(register, initialState);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form
            action={dispatch}
            className={
                'flex flex-col justify-evenly items-center gap-4 py-4 bg-gray-200/80 w-[35rem] max-h-dvh overflow-y-auto rounded-lg shadow-2xl max-xl:text-2xl'
            }
        >
            <h1 className={'text-5xl xs:text-3xl'}>{t('auth.register')}</h1>
            <label className={'w-[90%] space-y-2'}>
                <p>Email</p>
                <input
                    name={'email'}
                    type={'email'}
                    placeholder={'example@gmail.com'}
                    required={true}
                    className={'border-2 border-gray-500 rounded w-full'}
                />
            </label>
            <label className={'w-[90%] space-y-2'}>
                <p>{t('main.name')}</p>
                <input
                    name={'username'}
                    minLength={2}
                    placeholder={t('auth.username')}
                    required={true}
                    className={'border-2 border-gray-500 rounded w-full'}
                />
            </label>
            <label className={'relative w-[90%] space-y-2'}>
                <p>{t('auth.password')}</p>
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
            <label className={'w-[90%] space-y-2'}>
                <p>{t('auth.repeat-password')}</p>
                <input
                    name={'repeatPassword'}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={'********'}
                    required={true}
                    className={'border-2 border-gray-500 rounded w-full'}
                />
            </label>
            <Link href={'/login'} className={'underline transition-all duration-500 hover:tracking-widest'}>
                {t('auth.have-account')}
            </Link>
            {state.error && (
                <div
                    className={'flex items-center bg-red-200 px-8 py-2 rounded-lg text-center w-[90%] h-fit'}
                >
                    <TriangleAlert className={'size-8'} />
                    <div className={'flex-1'}>
                        {state.error.map((message) => (
                            <p key={message}>{t(`auth.${message}`)}</p>
                        ))}
                    </div>
                </div>
            )}
            {state.success && (
                <div className={'flex items-center bg-emerald-200 px-8 py-2 rounded-lg text-center w-[90%]'}>
                    <CircleCheck className={'size-8'} />
                    <p
                        className={'flex-1'}
                        dangerouslySetInnerHTML={{ __html: t.raw(`auth.${state.success}`) }}
                    />
                </div>
            )}
            <RegisterButton />
        </form>
    );
};

function RegisterButton() {
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
            {t('send')}
        </button>
    );
}

export default RegisterForm;
