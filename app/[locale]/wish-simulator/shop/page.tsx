import { redirect } from '@/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Shop({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    redirect('/wish-simulator/shop/paimon-bargain');
}
