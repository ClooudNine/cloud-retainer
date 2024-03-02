import NewVerificationForm from '@/components/main-page/new-verification-form';
import { Suspense } from 'react';
export const dynamic = 'force-dynamic';
export default function NewVerificationPage() {
    return (
        <Suspense>
            <NewVerificationForm />
        </Suspense>
    );
}
