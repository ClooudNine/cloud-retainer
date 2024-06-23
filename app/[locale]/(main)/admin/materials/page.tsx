import { unstable_setRequestLocale } from 'next-intl/server';
import { getAllMaterials } from '@/data/materials';
import BackButton from '@/components/main/back-button';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import MaterialsList from '@/components/admin/materials/materials-list';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';

export default async function AdminMaterials({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const allMaterials = await getAllMaterials();

    if (!allMaterials) {
        return <h1>Materials fetch error!</h1>;
    }

    return (
        <section
            className={'flex-1 overflow-hidden flex flex-col gap-4 px-4 pt-10 pb-2 max-xs:h-3/4 xs:pt-4'}
        >
            <div className={'relative flex items-center gap-4'}>
                <BackButton />
                <Construction className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>Админ-панель | Материалы</h1>
                <Image
                    src={'common/shikanoin-heizou-namecard.webp'}
                    alt={'Shikanoin Heizou Namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новый материал</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <MaterialsList materials={allMaterials} />
        </section>
    );
}
