import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Boss } from '@/lib/types';
import { useTranslations } from 'next-intl';

const BossesButton = ({ boss }: { boss: Boss }) => {
    const t = useTranslations();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/bosses/profiles/${boss.name}.webp`}
                        alt={t(`bosses.${boss.name}`)}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {t(`bosses.${boss.name}`)}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default BossesButton;
