'use client';
import { useRouter } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';

const BackButton = () => {
    const router = useRouter();

    return (
        <CircleArrowLeft
            onClick={router.back}
            className={'size-16 transition rounded-full hover:bg-black hover:stroke-white sm:size-8'}
        />
    );
};

export default BackButton;
