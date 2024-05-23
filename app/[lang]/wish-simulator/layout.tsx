import AudioProvider from '@/app/wish-simulator/audio-provider';

export default function WishSimulatorLayout({ children }: { children: React.ReactNode }) {
    return <AudioProvider>{children}</AudioProvider>;
}
