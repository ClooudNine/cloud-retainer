'use client';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import Logo from '@/components/main/logo';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const NewVerificationForm = () => {
    const t = useTranslations('auth');

    const [success, setSuccess] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError(t('token-not-found'));
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success && t(data.success));
                setError(data.error && t(data.error));
            })
            .catch(() => setError(t('something-wrong')));
    }, [error, success, t, token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <main className={'size-full flex items-center justify-center'}>
            <Logo styles={'absolute top-12 left-12'} />
            <section className={'flex flex-col gap-4 items-center bg-gray-200 rounded-2xl p-8'}>
                <Image
                    src={'common/xianyun-confirmation.webp'}
                    alt={'Xianyun emoji'}
                    width={340}
                    height={340}
                    className={'w-48'}
                />
                <p className={'text-5xl xl:text-3xl'}>{t('mail-confirmation')}</p>
                {!error && !success && <BeatLoader />}
                {error && (
                    <div
                        className={
                            'text-2xl flex items-center gap-4 bg-red-200 px-8 py-2 rounded-lg whitespace-nowrap xl:text-xl'
                        }
                    >
                        <TriangleAlert className={'size-8'} />
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div
                        className={
                            'text-2xl flex items-center gap-4 bg-emerald-200 px-8 py-2 rounded-lg whitespace-nowrap xl:text-xl'
                        }
                    >
                        <CircleCheck className={'size-8'} />
                        <p>{success}</p>
                    </div>
                )}
                <Link
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'max-xs:p-8 max-xs:text-2xl max-xs:rounded-xl',
                        })
                    )}
                    href={'/login'}
                >
                    {t('go-to-login')}
                </Link>
            </section>
        </main>
    );
};
export default NewVerificationForm;
