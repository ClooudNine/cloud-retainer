import Background from '@/app/wish-simulator/components/Background';
import Sidebar from '@/components/wish-simulator/shop/sidebar';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв - Магазин',
    description:
        'Магазин внутриигровой валюты и валюты для совершения молитв: примогемы, судьбоносные встречи, переплетающиеся судьбы и так далее.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={'h-full w-full flex'}>
            <Background isBlurred={true} />
            <Sidebar />
            <section className={'flex-1'}>{children}</section>
        </main>
    );
}
