import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Promocode } from '@/lib/types';
import PromocodeForm from '@/components/admin/promocodes/promocode-form';

const PromocodesButton = ({ promocode }: { promocode: Promocode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={
                        'text-xl h-40 w-56 bg-gray-300 rounded-lg flex flex-col items-center justify-center text-center'
                    }
                >
                    {promocode.value}
                </div>
            </DialogTrigger>
            <PromocodeForm promocode={promocode} />
        </Dialog>
    );
};

export default PromocodesButton;
