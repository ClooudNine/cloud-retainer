import Image from 'next/image';
import clsx from 'clsx';

import { PurchasesCurrency } from '@/lib/types';
import { useTranslations } from 'next-intl';

const NavbarButton = ({
    isActiveCurrency,
    currency,
    setCurrency,
}: {
    isActiveCurrency: boolean;
    currency: PurchasesCurrency;
    setCurrency: () => void;
}) => {
    const t = useTranslations();

    const currencyButtonClasses = clsx('group h-full flex-1 relative cursor-genshin transition', {
        'text-[#ece5d7] hover:drop-shadow-[0px_0px_15px_#ffffff] active:drop-shadow-none active:text-[#3b4254]':
            !isActiveCurrency,
        'text-[#3b4254]': isActiveCurrency,
    });

    const currencyButtonBackgroundClasses = clsx('w-full h-[115%] absolute -top-[7%] transition', {
        'opacity-0 group-active:opacity-100': !isActiveCurrency,
        'opacity-100': isActiveCurrency,
    });

    return (
        <button onClick={setCurrency} className={currencyButtonClasses}>
            <Image
                src={'wish-simulator/assets/shop/select-currency-background.webp'}
                width={377}
                height={60}
                alt={t('image-alts.choose-valet-background')}
                draggable={false}
                className={currencyButtonBackgroundClasses}
            />
            <p className={'relative'}>{t(`common.${currency}`, { count: 1 })}</p>
        </button>
    );
};

export default NavbarButton;
