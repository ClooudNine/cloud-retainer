import NavbarButton from '@/app/wish-simulator/shop/paimon-bargain/NavbarButton';
import { PurchasesCurrency } from '@/lib/common';
import { purchasesCurrencies } from '@/lib/shop';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { useCallback } from 'react';

export const Navbar = ({
    currentCurrency,
    setCurrency,
}: {
    currentCurrency: PurchasesCurrency;
    setCurrency: (currency: PurchasesCurrency) => void;
}) => {
    const setCurrencyHandler = useCallback(
        (currency: PurchasesCurrency) => {
            playSfxEffect('/sounds/click-3.mp3');
            setCurrency(currency);
        },
        [setCurrency]
    );

    return (
        <nav
            className={
                'mx-auto w-[95%] h-10 leading-tight flex items-center text-xs border-y-2 border-y-black border-opacity-20 bg-[radial-gradient(circle,rgba(59,66,84,0.7)_90%,rgba(59,66,84,0)_100%)] sm:h-8 lg:leading-none lg:ml-12 lg:text-xl lg:w-[70%] lg:h-14'
            }
        >
            <div
                className={
                    'w-full flex items-center gap-4 h-[90%] border-y border-y-[#7f7279]'
                }
            >
                {Object.entries(purchasesCurrencies).map((currency) => (
                    <NavbarButton
                        key={currency[0]}
                        currentCurrency={currentCurrency}
                        currency={currency as [PurchasesCurrency, string]}
                        setCurrency={() => {
                            setCurrencyHandler(currency[0] as PurchasesCurrency);
                        }}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
