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
import HelpIcon from '@/components/icons/help';
import { Button } from '@/components/ui/button';
import CharacterIcon from '@/components/icons/character';
const HelpDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Помощь <HelpIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Приветствуем на сайте Cloud Retainer!</DialogTitle>
                    <DialogDescription>Краткая сводка о сайте</DialogDescription>
                </DialogHeader>
                <p className={'text-justify'}>
                    Сайт представляет собой помощник для игры Genshin Impact. В нём
                    собраные все необходимые для путешественников разделы. Вы можете
                    ознакомиться с персонажами и оружием (на данный момент), попробовать
                    свою удачу в «Симуляторе молитв». В будущем будут добавлены разделы
                    «Достижения», «История молитв». Все обновления будут отражены в
                    новостях на самом сайте и в telegram-канале.
                </p>
                <h2 className={'text-destructive text-center'}>
                    Сайт находится в активной разработке! <br />
                    Просьба все замечания и предложения писать на указанные ниже адреса
                </h2>
                <p>
                    E-Mail:{' '}
                    <a className={'underline'} href="mailto:syrel.vladislav@gmail.com">
                        syrel.vladislav@gmail.com
                    </a>
                    <br />
                    Telegram: @clooud_nine
                </p>
                <h2 className={'text-destructive text-center'}>Приятного пользования!</h2>
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
