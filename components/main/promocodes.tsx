import { Promocode } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useLocale, useTranslations } from 'next-intl';
import PromocodeInfo from '@/components/main/promocode-info';

const Promocodes = ({ promocodes }: { promocodes: Promocode[] | null }) => {
    const locale = useLocale();
    const t = useTranslations('main');

    if (!promocodes) {
        return <div>Cannot load promocodes!</div>;
    }

    return (
        <Card className={'lg:w-[70%]'}>
            <CardHeader className={'py-2'}>
                <CardTitle className={'text-3xl flex items-center gap-2 max-xs:justify-center xs:text-xl'}>
                    <Gem />
                    {t('current-promo-codes')}
                    <Gem />
                </CardTitle>
                <CardDescription className={'max-xs:text-xl'}>{t('activate-promo-page')}</CardDescription>
            </CardHeader>
            <CardContent className={'py-2'}>
                <Carousel className={'w-[90%] ml-9'}>
                    <CarouselContent>
                        {promocodes.map((promocode) => (
                            <CarouselItem key={promocode.value} className={'basis-1/2 xs:basis-1/3'}>
                                <PromocodeInfo promocode={promocode} locale={locale} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className={'size-8'} />
                    <CarouselNext className={'size-8'} />
                </Carousel>
            </CardContent>
        </Card>
    );
};

export default Promocodes;
