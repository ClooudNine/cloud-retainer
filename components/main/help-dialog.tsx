import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';

const HelpDialog = () => {
    const t = useTranslations('main');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'top-8 right-8 h-min gap-2 max-xs:rounded-xl max-xs:fixed'}>
                    <span className={'max-xs:hidden'}>{t('help.title')}</span>
                    <CircleHelp className={'size-12 xs:size-6'} />
                </Button>
            </DialogTrigger>
            <DialogContent className={'max-w-2xl max-xs:text-2xl max-xs:pt-12 xs:max-lg:max-w-[75%]'}>
                <DialogHeader>
                    <DialogTitle className={'max-xs:text-3xl'}>{t('help.header')}</DialogTitle>
                    <DialogDescription className={'max-xs:text-2xl'}>
                        {t('help.description')}
                    </DialogDescription>
                </DialogHeader>
                <p className={'text-justify'}>{t('help.main-info')}</p>
                <h2 className={'text-green-700 text-center'}>{t('help.updates')}</h2>
                <h2 className={'text-destructive text-center'}>{t('help.links')}</h2>
                <p>
                    E-Mail:{' '}
                    <a className={'underline'} target="_blank" href="mailto:cloud.retainer.dev@gmail.com">
                        cloud.retainer.dev@gmail.com
                    </a>
                    <br />
                    {t('help.telegram')}:{' '}
                    <a className={'underline'} target="_blank" href="https://t.me/cloud_retainer_community">
                        Cloud Retainer | Community
                    </a>
                </p>
                <h2 className={'text-destructive text-center'}>{t('help.greeting')}</h2>
                <h2 className={'text-destructive text-center'}>{t('help.disclaimer')}</h2>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className={'max-xs:text-2xl max-xs:h-12'}>{t('back')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default HelpDialog;
