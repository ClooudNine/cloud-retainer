'use client';
import { useRouter } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';

const BackButton = () => {
    const router = useRouter();

    return (
        <CircleArrowLeft
            onClick={router.back}
            className={'size-8 transition rounded-full hover:bg-black hover:stroke-white'}
        />
    );
};

export default BackButton;