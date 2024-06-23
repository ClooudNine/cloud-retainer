import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import { CharacterTalent, Elements, WeaponType } from '@/lib/types';
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
import { useTranslations } from 'next-intl';

const TalentModal = ({
    talent,
    element,
    weaponType,
    characterName,
}: {
    talent: CharacterTalent;
    element: Elements;
    weaponType: WeaponType;
    characterName: string;
}) => {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card
                    className={
                        'group flex items-center justify-between px-6 py-2 transition duration-500 hover:border-[rgb(var(--element-color))] hover:bg-[rgb(var(--element-color))] hover:translate-x-3 hover:text-white'
                    }
                >
                    <Image
                        src={`characters/talents/${talent.type === 'Normal Attack' ? weaponType + ' ' + element : talent.title}.webp`}
                        alt={t(`characters.${characterName}.talents.${talent.title}.title`)}
                        width={128}
                        height={128}
                        className={
                            'size-24 transition duration-500 group-hover:animate-flip xl:size-[3.75rem]'
                        }
                    />
                    <div className={'text-center max-xl:text-2xl'}>
                        <p>{t(`characters.${characterName}.talents.${talent.title}.title`)}</p>
                        <p className={'text-muted-foreground'}>{t(`talent-types.${talent.type}`)}</p>
                    </div>
                    <ArrowRightCircle className={'size-16 group-hover:stroke-white xl:size-8'} />
                </Card>
            </DialogTrigger>
            <DialogContent className={'max-w-3xl xs:max-xl:max-w-[75%]'}>
                <DialogHeader>
                    <DialogTitle className={'max-xl:text-3xl'}>
                        {t(`characters.${characterName}.talents.${talent.title}.title`)}
                        <Image
                            src={`characters/talents/${talent.type === 'Normal Attack' ? weaponType + ' ' + element : talent.title}.webp`}
                            alt={t(`characters.${characterName}.talents.${talent.title}.title`)}
                            width={80}
                            height={80}
                            className={'size-16 absolute top-2 right-12'}
                        />
                    </DialogTitle>
                    <DialogDescription className={'max-xl:text-xl'}>
                        {t(`characters.${characterName}.name`)} - {t(`talent-types.${talent.type}`)}
                    </DialogDescription>
                </DialogHeader>
                <div
                    style={
                        {
                            '--element-color': elementToColor[element],
                        } as CSSProperties
                    }
                    dangerouslySetInnerHTML={{
                        __html: t.raw(`characters.${characterName}.talents.${talent.title}.description`),
                    }}
                    className={'max-xl:text-xl [&_em]:not-italic [&_em]:text-[rgb(var(--element-color))]'}
                ></div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className={'max-xs:text-2xl max-xs:h-12'}>{t('main.back')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TalentModal;
