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
                <Button className={'top-8 right-8 h-min gap-2 max-xs:rounded-xl max-xs:fixed'}>
                    <span className={'max-xs:hidden'}>Помощь</span>
                    <CircleHelp className={'size-12 xs:size-6'} />
                </Button>
            </DialogTrigger>
            <DialogContent className={'max-w-2xl max-xs:text-2xl max-xs:pt-12 xs:max-lg:max-w-[75%]'}>
                <DialogHeader>
                    <DialogTitle className={'max-xs:text-3xl'}>
                        Приветствуем на сайте Cloud Retainer!
                    </DialogTitle>
                    <DialogDescription className={'max-xs:text-2xl'}>
                        Краткая сводка о сайте
                    </DialogDescription>
                </DialogHeader>
                <p className={'text-justify'}>
                    Сайт представляет собой помощник для игры Genshin Impact. В нём собраны все необходимые
                    для путешественников разделы. Вы можете ознакомиться с персонажами и оружием, их
                    характеристиками, советами по улучшению, опробовать свою удачу в «Симуляторе молитв». В
                    будущем будут добавлены разделы «Достижения», «События».
                </p>
                <h2 className={'text-green-700 text-center'}>
                    Все обновления будут публиковаться в новостях на самом сайте (скоро) и в Telegram-канале.
                </h2>
                <h2 className={'text-destructive text-center'}>
                    Сайт находится в активной разработке! <br />
                    Задать интересующие вопросы, указать на ошибки и предложить нововведения вы можете по
                    следующим ссылкам
                </h2>
                <p>
                    E-Mail:{' '}
                    <a className={'underline'} target="_blank" href="mailto:cloud.retainer.dev@gmail.com">
                        cloud.retainer.dev@gmail.com
                    </a>
                    <br />
                    Telegram-канал:{' '}
                    <a className={'underline'} target="_blank" href="https://t.me/cloud_retainer_community">
                        Cloud Retainer | Community
                    </a>
                </p>
                <h2 className={'text-destructive text-center'}>Приятного пользования!</h2>
                <h2 className={'text-destructive text-center'}>
                    Сайт не связан с компанией HoYoverse. Все права на игру Genshin Impact, контент и
                    материалы игры принадлежат компании HoYoverse.
                </h2>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className={'max-xs:text-2xl max-xs:h-12'}>Назад</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default HelpDialog;
