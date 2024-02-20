'use client';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import xianyunConfirmation from '@/public/common/xianyun-confirmation.webp';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import Warning from '@/components/icons/warning';
import Success from '@/components/icons/success';

const NewVerificationForm = () => {
    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError('Токен отсутствует!');
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => setError('Что-то пошло не так!'));
    }, [error, success, token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <main
            className={
                'w-full h-full flex items-center justify-center font-genshin text-3xl'
            }
        >
            <section
                className={
                    'flex flex-col gap-4 items-center bg-gray-200 rounded-2xl px-8 py-2'
                }
            >
                <Image
                    src={xianyunConfirmation}
                    alt={'Xianyun Emoji'}
                    quality={100}
                    draggable={false}
                    width={250}
                />
                <p>Подтверждение почты</p>
                {!error && !success && <BeatLoader />}
                {error && (
                    <div
                        className={
                            'flex items-center gap-4 bg-red-200 px-8 py-2 rounded-lg text-center w-[90%] h-fit'
                        }
                    >
                        <Warning />
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div
                        className={
                            'flex items-center gap-4 bg-emerald-200 px-8 py-2 rounded-lg text-center w-[90%]'
                        }
                    >
                        <Success />
                        <p className={'flex-1'}>{success}</p>
                    </div>
                )}
            </section>
        </main>
    );
};
export default NewVerificationForm;
