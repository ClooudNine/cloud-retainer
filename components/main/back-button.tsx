'use client';
import { useRouter } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackButton = ({ className }: { className: string }) => {
    const router = useRouter();

    return (
        <CircleArrowLeft
            onClick={router.back}
            className={cn(
                'h-full w-auto transition rounded-full hover:bg-black hover:stroke-white',
                className
            )}
        />
    );
};

export default BackButton;
