import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { ArtifactSet } from '@/lib/types';
import { useTranslations } from 'next-intl';

const ArtifactsButton = ({ artifact }: { artifact: ArtifactSet }) => {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/artifacts/${artifact.title}.webp`}
                        alt={t(`artifacts.${artifact.title}.title`)}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {t(`artifacts.${artifact.title}.title`)}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default ArtifactsButton;
