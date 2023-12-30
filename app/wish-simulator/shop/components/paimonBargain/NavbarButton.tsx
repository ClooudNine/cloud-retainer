import Image from 'next/image';
import currencyButtonBackground from '@/public/wish-simulator/assets/select-currency-background.webp';
import clsx from 'clsx';
import { PurchasesCurrency } from '@/lib/common';

const NavbarButton = ({
    currentCurrency,
    currency,
    setCurrency,
}: {
    currentCurrency: PurchasesCurrency;
    currency: [PurchasesCurrency, string];
    setCurrency: () => void;
}) => {
    const isActiveCurrency = currentCurrency === currency[0];
    const currencyButtonClasses = clsx(
        'group relative cursor-genshin h-full w-[30%] transition',
        {
            'text-[#ece5d7] hover:drop-shadow-[0px_0px_15px_#ffffff] active:drop-shadow-none active:text-[#3b4254]':
                !isActiveCurrency,
            'text-[#3b4254]': isActiveCurrency,
        }
    );

    const currencyButtonBackgroundClasses = clsx(
        'absolute transition -mt-1 h-[115%] w-full top-0',
        {
            'opacity-0 group-active:opacity-100': !isActiveCurrency,
            'opacity-100': isActiveCurrency,
        }
    );

    return (
        <button onClick={setCurrency} className={currencyButtonClasses}>
            <Image
                src={currencyButtonBackground}
                alt={'Фон кнопки выбора валюты'}
                quality={100}
                draggable={false}
                className={currencyButtonBackgroundClasses}
            />
            <p className={'relative'}>{currency[1]}</p>
        </button>
    );
};

export default NavbarButton;
