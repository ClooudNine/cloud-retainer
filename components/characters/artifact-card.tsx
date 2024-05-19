import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import { ArtifactSet } from '@/lib/types';

const ArtifactCard = ({
    firstArtifactSet,
    secondArtifactSet,
    rating,
}: {
    firstArtifactSet: ArtifactSet;
    secondArtifactSet: ArtifactSet;
    rating: number;
}) => {
    return (
        <TooltipProvider delayDuration={400}>
            <Tooltip>
                <TooltipTrigger
                    className={
                        'flex-1 rounded-2xl bg-gray-300 overflow-hidden transition duration-500 hover:-translate-y-1.5'
                    }
                >
                    <div className={'relative w-full h-[70%] flex justify-center'}>
                        <p
                            className={
                                'z-10 absolute top-2 left-2 px-2 rounded-full border-2 border-white text-white'
                            }
                        >
                            {rating}
                        </p>
                        <Image
                            src={`common/items-backgrounds-by-rarity/background-item-5-star.webp`}
                            alt={'5'}
                            fill
                            className={'object-cover'}
                        />
                        <Image
                            src={`common/artifacts/${firstArtifactSet.title}.webp`}
                            alt={firstArtifactSet.title}
                            width={256}
                            height={256}
                            className={`z-10 object-contain ${secondArtifactSet.title !== firstArtifactSet.title && 'w-1/2'}`}
                        />
                        {secondArtifactSet.title !== firstArtifactSet.title && (
                            <Image
                                src={`common/artifacts/${secondArtifactSet.title}.webp`}
                                alt={secondArtifactSet.title}
                                width={256}
                                height={256}
                                className={'z-10 object-contain w-1/2'}
                            />
                        )}
                    </div>
                    <div
                        className={'h-[30%] flex justify-center items-center text-center text-xl xl:text-sm'}
                    >
                        {firstArtifactSet.title}
                        {secondArtifactSet.title !== firstArtifactSet.title &&
                            ' / ' + secondArtifactSet.title}
                    </div>
                </TooltipTrigger>
                <TooltipContent className={'break-words max-w-xl'}>
                    2 предмета: {firstArtifactSet.twoArtifactsBonus}
                    <br />
                    {firstArtifactSet.title === secondArtifactSet.title
                        ? `4 предмета: ${firstArtifactSet.fourArtifactsBonus}`
                        : `2 предмета: ${secondArtifactSet.twoArtifactsBonus}`}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ArtifactCard;
