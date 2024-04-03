'use client';
import CrossIcon from '@/components/icons/cross';
import { BannerTypes } from '@/lib/db/schema';
import { deleteBanner } from '@/actions/banner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const DeleteBannerButton = ({ setBanner }: { setBanner: () => void }) => {
    return (
        <button className={'p-2 rounded bg-red-400 transition hover:bg-red-600'}
                onClick={setBanner}>
            <CrossIcon/>
        </button>
    );
};

export default DeleteBannerButton;
