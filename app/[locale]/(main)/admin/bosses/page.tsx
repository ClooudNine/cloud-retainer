import { unstable_setRequestLocale } from 'next-intl/server';
import BackButton from '@/components/main/back-button';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import BossesList from '@/components/admin/bosses/bosses-list';
import { getAllBosses } from '@/data/bosses';

export default async function AdminBosses({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const allBosses = await getAllBosses();

    if (!allBosses) {
        return <h1>Bosses fetch error!</h1>;
    }

    return (
        <section
            className={'flex-1 overflow-hidden flex flex-col gap-4 px-4 pt-10 pb-2 max-xs:h-3/4 xs:pt-4'}
        >
            <div className={'relative flex items-center gap-4'}>
                <BackButton />
                <Construction className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>Админ-панель | Боссы</h1>
                <Image
                    src={'common/shikanoin-heizou-namecard.webp'}
                    alt={'Shikanoin Heizou Namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <BossesList bosses={allBosses} />
        </section>
    );
}
