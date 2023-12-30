import { Dispatch, SetStateAction } from 'react';
import { currencies } from '@/app/wish-simulator/shop/components/paimonBargain/PaimonBargain';
import NavbarButton from '@/app/wish-simulator/shop/components/paimonBargain/NavbarButton';
import { PurchasesCurrency } from '@/lib/common';

export const Navbar = ({
    currentCurrency,
    setCurrency,
}: {
    currentCurrency: PurchasesCurrency;
    setCurrency: Dispatch<SetStateAction<PurchasesCurrency>>;
}) => {
    return (
        <nav
            className={
                'mx-auto md:ml-12 w-[95%] xl:w-[70%] h-14 flex items-center text-base xl:text-xl border-y-2 border-y-[rgba(0,0,0,0.2)] bg-[radial-gradient(circle,rgba(59,66,84,0.7)_90%,rgba(59,66,84,0)_100%)]'
            }
        >
            <div
                className={
                    'flex items-center gap-4 h-[90%] w-full border-y border-y-[#7f7279]'
                }
            >
                {Object.entries(currencies).map((currency) => (
                    <NavbarButton
                        key={currency[0]}
                        currentCurrency={currentCurrency}
                        currency={currency as [PurchasesCurrency, string]}
                        setCurrency={() => setCurrency(currency[0] as PurchasesCurrency)}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
