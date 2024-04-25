import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteBanner } from '@/actions/banner';
import { Banners } from '@/lib/types';

const ConfirmBannerDelete = ({
    banner,
    closeModal,
}: {
    banner: Banners | null;
    closeModal: () => void;
}) => {
    return (
        <AlertDialog open={Boolean(banner)}>
            <AlertDialogContent className={'max-w-fit'}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Вы уверены, что хотите удалить данный баннер?
                    </AlertDialogTitle>
                    <AlertDialogDescription className={'text-destructive'}>
                        Данное действие необратимо
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeModal}>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            await deleteBanner(banner?.id, banner?.type);
                            closeModal();
                        }}
                    >
                        Удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmBannerDelete;
