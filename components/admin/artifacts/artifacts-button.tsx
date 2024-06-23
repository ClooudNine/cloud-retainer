import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { ArtifactSet } from '@/lib/types';

const ArtifactsButton = ({ artifact }: { artifact: ArtifactSet }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}>
                    <Image
                        src={`common/artifacts/${artifact.title}.webp`}
                        alt={artifact.title}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {artifact.title}
                </div>
            </DialogTrigger>
        </Dialog>
    );
};

export default ArtifactsButton;
