import NewVerificationForm from '@/components/main-page/new-verification-form';
import { Suspense } from 'react';

export default function NewVerificationPage() {
    return (
        <Suspense>
            <NewVerificationForm />
        </Suspense>
    );
}
