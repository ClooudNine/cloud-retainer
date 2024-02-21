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

const DeleteBannerButton = ({ id, type }: { id: number; type: BannerTypes }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className={'p-2 rounded bg-red-400 transition hover:bg-red-600'}>
                    <CrossIcon />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Вы уверены, что хотите удалить данный баннер?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Данное действие необратимо
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Назад</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            await deleteBanner(id, type);
                        }}
                    >
                        Продолжить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteBannerButton;
