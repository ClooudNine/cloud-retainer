import Image from 'next/image';
import { Rares } from '@/lib/types';

const RarityStars = ({ rare }: { rare: Rares }) => {
    return (
        <div className={'flex gap-0.5'}>
            {Array.from(Array(Number(rare)).keys()).map((number) => (
                <Image
                    key={number}
                    src={'common/star.webp'}
                    alt={'Звезда'}
                    width={25}
                    height={25}
                    className={'size-8 xs:size-6'}
                />
            ))}
        </div>
    );
};

export default RarityStars;
