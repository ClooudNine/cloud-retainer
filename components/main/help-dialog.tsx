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

const HelpDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'gap-2'}>
                    Помощь <CircleHelp className={'size-6'} />
                </Button>
            </DialogTrigger>
            <DialogContent className={'max-w-xl'}>
                <DialogHeader>
                    <DialogTitle>Приветствуем на сайте Cloud Retainer!</DialogTitle>
                    <DialogDescription>Краткая сводка о сайте</DialogDescription>
                </DialogHeader>
                <p className={'text-justify'}>
                    Сайт представляет собой помощник для игры Genshin Impact. В нём собраны все
                    необходимые для путешественников разделы. Вы можете ознакомиться с персонажами и
                    оружием (на данный момент), опробовать свою удачу в «Симуляторе молитв». В
                    будущем будут добавлены разделы «Достижения», «История молитв».
                </p>
                <h2 className={'text-green-700 text-center'}>
                    Все обновления будут публиковаться в новостях на самом сайте и в
                    Telegram-канале.
                </h2>
                <h2 className={'text-destructive text-center'}>
                    Сайт находится в активной разработке! <br />
                    Задать интересующие вопросы, указать на ошибки и предложить нововведения вы
                    можете по следующим ссылкам
                </h2>
                <p>
                    E-Mail:{' '}
                    <a
                        className={'underline'}
                        target="_blank"
                        href="mailto:cloud.retainer.dev@gmail.com"
                    >
                        cloud.retainer.dev@gmail.com
                    </a>
                    <br />
                    Telegram-канал:{' '}
                    <a
                        className={'underline'}
                        target="_blank"
                        href="https://t.me/cloud_retainer_community"
                    >
                        Cloud Retainer | Community
                    </a>
                </p>
                <h2 className={'text-destructive text-center'}>Приятного пользования!</h2>
                <h2 className={'text-destructive text-center'}>
                    Сайт не связан с компанией HoYoverse. Все права на игру Genshin Impact, контент
                    и материалы игры принадлежат компании HoYoverse.
                </h2>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Назад</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default HelpDialog;
