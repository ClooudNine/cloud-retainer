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
import { useLocale } from 'next-intl';
import PromocodeInfo from '@/components/main/promocode-info';

const Promocodes = ({ promocodes }: { promocodes: Promocode[] | null }) => {
    const locale = useLocale();

    if (!promocodes) {
        return <div>Cannot load promocodes!</div>;
    }

    return (
        <Card className={'w-[70%]'}>
            <CardHeader className={'py-2'}>
                <CardTitle className={'text-xl flex items-center gap-2'}>
                    <Gem />
                    Актуальные промокоды
                    <Gem />
                </CardTitle>
                <CardDescription>
                    Для перехода к странице активации кликните на кнопку «Активировать»
                </CardDescription>
            </CardHeader>
            <CardContent className={'py-2'}>
                <Carousel className={'w-[90%] ml-12'}>
                    <CarouselContent>
                        {promocodes.map((promocode) => (
                            <CarouselItem key={promocode.value} className={'pl-4 basis-1/3'}>
                                <PromocodeInfo promocode={promocode} locale={locale} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
        </Card>
    );
};

export default Promocodes;
