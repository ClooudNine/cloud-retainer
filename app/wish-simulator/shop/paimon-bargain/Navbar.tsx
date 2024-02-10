import NavbarButton from '@/app/wish-simulator/shop/paimon-bargain/NavbarButton';
import { purchasesCurrencies } from '@/lib/shop';
import { playSfxEffect } from '@/app/wish-simulator/utils';
import { useCallback } from 'react';
import { PurchasesCurrency } from '@/lib/banners';

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
                'mx-4 h-16 flex items-center text-xl/tight border-y-2 border-y-black border-opacity-20 bg-[radial-gradient(circle,rgba(59,66,84,0.7)_90%,rgba(59,66,84,0)_100%)] lg:ml-12 lg:text-base lg:w-[70%] lg:h-11'
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
