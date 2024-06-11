import AudioProvider from '@/components/wish-simulator/audio-provider';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function WishSimulatorLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);
    return <AudioProvider>{children}</AudioProvider>;
}
