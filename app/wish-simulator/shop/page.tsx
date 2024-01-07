import Background from '@/app/wish-simulator/components/Background';
import Sidebar from '@/app/wish-simulator/shop/components/Sidebar';
import PaimonBargain from '@/app/wish-simulator/shop/components/paimonBargain/PaimonBargain';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв - Магазин',
    description:
        'Магазин внутриигровой валюты и валюты для совершения молитв: примогемы, судьбоносные встречи, переплетающиеся судьбы и так далее.',
};
export type Sections = 'paimonBargain' | 'genesisCrystals';
export default function Shop({ searchParams }: { searchParams: { section: Sections } }) {
    return (
        <main className={'h-full w-full flex cursor-genshin font-genshin'}>
            <Background isBlurred={true} />
            <Sidebar />
            {searchParams.section === 'paimonBargain' ? <PaimonBargain /> : ''}
        </main>
    );
}
