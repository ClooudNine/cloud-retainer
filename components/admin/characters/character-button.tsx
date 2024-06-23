import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Character } from '@/lib/types';
import { useTranslations } from 'next-intl';

const CharactersButton = ({ character }: { character: Character }) => {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`characters/profiles/${character.name}.webp`}
                        alt={t(`characters.${character.name}.name`)}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {t(`characters.${character.name}.name`)}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default CharactersButton;
