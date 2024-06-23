import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Boss } from '@/lib/types';

const BossesButton = ({ boss }: { boss: Boss }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/bosses/profiles/${boss.name}.webp`}
                        alt={boss.name}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {boss.name}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default BossesButton;
