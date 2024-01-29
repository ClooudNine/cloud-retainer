import AudioProvider from '@/app/wish-simulator/AudioProvider';

export default function WishSimulatorLayout({ children }: { children: React.ReactNode }) {
    return <AudioProvider>{children}</AudioProvider>;
}
