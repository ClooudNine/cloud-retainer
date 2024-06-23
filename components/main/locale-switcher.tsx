'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';

const LocaleSwitcher = () => {
    const t = useTranslations('main');
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className={'top-8 left-6 max-xs:h-min gap-2 max-xs:rounded-xl max-xs:fixed'}>
                    <span className={'max-xs:hidden'}>{t('current-language')}:</span>{' '}
                    <span className={'text-5xl xs:text-3xl'}>{locale === 'ru' ? '🇷🇺' : '🇬🇧'}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className={'w-64 p-2 flex flex-col gap-1 text-lg xs:w-56'}>
                <Link
                    className={
                        'p-2 bg-gray-200 rounded-lg transition hover:bg-primary hover:text-white max-xs:text-4xl'
                    }
                    locale={'ru'}
                    href={pathname}
                >
                    🇷🇺 Русский
                </Link>
                <Link
                    className={
                        'p-2 bg-gray-200 rounded-lg transition hover:bg-primary hover:text-white max-xs:text-4xl'
                    }
                    locale={'en'}
                    href={pathname}
                >
                    🇬🇧 English
                </Link>
            </PopoverContent>
        </Popover>
    );
};

export default LocaleSwitcher;
