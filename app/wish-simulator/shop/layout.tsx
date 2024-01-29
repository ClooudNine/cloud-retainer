import Background from '@/app/wish-simulator/components/Background';
import Sidebar from '@/app/wish-simulator/shop/components/Sidebar';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв - Магазин',
    description:
        'Магазин внутриигровой валюты и валюты для совершения молитв: примогемы, судьбоносные встречи, переплетающиеся судьбы и так далее.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={'h-full w-full flex cursor-genshin font-genshin'}>
            <Background isBlurred={true} />
            <Sidebar />
            <section className={'flex-1'}>{children}</section>
        </main>
    );
}
