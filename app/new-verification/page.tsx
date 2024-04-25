import NewVerificationForm from '@/components/main/new-verification-form';
import { Suspense } from 'react';

export default function NewVerificationPage() {
    return (
        <Suspense>
            <NewVerificationForm />
        </Suspense>
    );
}
