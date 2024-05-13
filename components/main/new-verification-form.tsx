'use client';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { CircleCheck, TriangleAlert } from 'lucide-react';

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
        <main className={'w-full h-full flex items-center justify-center'}>
            <section className={'flex flex-col gap-4 items-center bg-gray-200 rounded-2xl px-8 py-2'}>
                <Image
                    src={'common/xianyun-confirmation.webp'}
                    alt={'Xianyun эмоджи'}
                    width={340}
                    height={340}
                    className={'w-48'}
                />
                <p className={'text-3xl'}>Подтверждение почты</p>
                {!error && !success && <BeatLoader />}
                {error && (
                    <div
                        className={
                            'text-xl flex items-center gap-4 bg-red-200 px-8 py-2 rounded-lg text-center whitespace-nowrap'
                        }
                    >
                        <TriangleAlert className={'size-8'} />
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div
                        className={
                            'text-xl flex items-center gap-4 bg-emerald-200 px-8 py-2 rounded-lg text-center whitespace-nowrap'
                        }
                    >
                        <CircleCheck className={'size-8'} />
                        <p>{success}</p>
                    </div>
                )}
            </section>
        </main>
    );
};
export default NewVerificationForm;
