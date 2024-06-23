import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Promocode } from '@/lib/types';
import PromocodesButton from '@/components/admin/promocodes/promocode-button';
import PromocodeForm from '@/components/admin/promocodes/promocode-form';

const PromocodesList = ({ promocodes }: { promocodes: Promocode[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новый промокод</Button>
                </DialogTrigger>
                <PromocodeForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {promocodes.map((promocode) => (
                        <PromocodesButton key={promocode.value} promocode={promocode} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default PromocodesList;
