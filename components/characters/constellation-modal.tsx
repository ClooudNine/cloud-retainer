import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { CharacterConstellation, Elements } from '@/lib/types';
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
import { elementToColor } from '@/lib/constants';
import { CSSProperties } from 'react';

const ConstellationModal = ({
    constellation,
    element,
}: {
    constellation: CharacterConstellation;
    element: Elements;
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card
                    className={
                        'w-[49.5%] group transition duration-500 hover:border-[rgb(var(--element-color))] hover:bg-[rgb(var(--element-color))] hover:scale-105 hover:text-white'
                    }
                >
                    <CardHeader className={'py-2 items-center'}>
                        <Image
                            src={`characters/constellations/${constellation.title}.webp`}
                            alt={constellation.title}
                            width={80}
                            height={80}
                            className={'size-32 transition duration-500 group-hover:animate-flip xl:size-16'}
                        />
                    </CardHeader>
                    <CardContent className={'py-2 text-center max-xl:text-2xl'}>
                        <p>{constellation.title}</p>
                        <p className={'text-muted-foreground'}>Level {constellation.level}</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className={'max-w-2xl xs:max-xl:max-w-[75%]'}>
                <DialogHeader>
                    <DialogTitle className={'max-xl:text-3xl'}>
                        {constellation.title}
                        <Image
                            src={`characters/constellations/${constellation.title}.webp`}
                            alt={constellation.title}
                            width={80}
                            height={80}
                            className={'size-16 absolute top-2 right-12'}
                        />
                    </DialogTitle>
                    <DialogDescription className={'max-xl:text-xl'}>
                        Level {constellation.level}
                    </DialogDescription>
                </DialogHeader>
                <div
                    style={
                        {
                            '--element-color': elementToColor[element],
                        } as CSSProperties
                    }
                    dangerouslySetInnerHTML={{ __html: constellation.description }}
                    className={'max-xl:text-xl [&_em]:not-italic [&_em]:text-[rgb(var(--element-color))]'}
                ></div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className={'max-xs:text-2xl max-xs:h-12'}>Назад</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConstellationModal;
