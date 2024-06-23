import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Weapon } from '@/lib/types';

const WeaponsButton = ({ weapon }: { weapon: Weapon }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`weapons/portraits/${weapon.title}.webp`}
                        alt={weapon.title}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {weapon.title}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default WeaponsButton;
