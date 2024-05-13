'use client';
import { X } from 'lucide-react';

const DeleteBannerButton = ({ setBanner }: { setBanner: () => void }) => {
    return (
        <button className={'p-2 rounded bg-red-400 transition hover:bg-red-600'} onClick={setBanner}>
            <X className={'size-6 stroke-white stroke-2'} />
        </button>
    );
};

export default DeleteBannerButton;
