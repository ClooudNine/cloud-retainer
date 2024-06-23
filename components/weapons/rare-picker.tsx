import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const RarePicker = ({ stars, setStars }: { stars: number; setStars: (count: number) => void }) => {
    const t = useTranslations('main');

    return (
        <div className={'space-y-2'}>
            <p>{t('rare')}:</p>
            <div className={'flex gap-1.5'}>
                {Array.from(Array(5).keys()).map((number) => (
                    <Star
                        key={number}
                        className={`size-12 transition hover:scale-105 ${stars > number ? 'scale-105 fill-black' : 'scale-100'}`}
                        onClick={() => setStars(stars === number + 1 ? 0 : number + 1)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RarePicker;
