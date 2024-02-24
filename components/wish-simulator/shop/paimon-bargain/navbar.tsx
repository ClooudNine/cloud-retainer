import NavbarButton from '@/components/wish-simulator/shop/paimon-bargain/navbar-button';
import { purchasesCurrencies } from '@/lib/shop';
import { PurchasesCurrency } from '@/lib/banners';

export const Navbar = ({
    currentCurrency,
    setCurrency,
}: {
    currentCurrency: PurchasesCurrency;
    setCurrency: (currency: PurchasesCurrency) => void;
}) => {
    return (
        <nav
            className={
                'mx-4 h-16 flex items-center text-xl/tight border-y-2 border-y-black/20 bg-[radial-gradient(circle,rgba(59,66,84,0.7)_90%,rgba(59,66,84,0)_100%)] lg:ml-12 lg:text-base lg:w-[70%] lg:h-11'
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
                            setCurrency(currency[0] as PurchasesCurrency);
                        }}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
