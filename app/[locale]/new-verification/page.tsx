import NewVerificationForm from '@/components/main/new-verification-form';
import { Suspense } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function NewVerificationPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <Suspense>
            <NewVerificationForm />
        </Suspense>
    );
}
