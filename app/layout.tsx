import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
    title: 'Cloud Retainer | Лучший помощник в мире Genshin Impact',
    description: `Крупный проект по игре Genshin Impact, который содержит в себе всё, 
    что нужно путешественникам: игровые персонажи, оружия, симулятор и история молитв, 
    калькуляторы и многое другое.`,
};

const genshinFont = localFont({
    src: '../public/fonts/Genshin Impact.woff2',
    display: 'swap',
    variable: '--font-genshin',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={'h-full text-[max(6px,1.1vmax)]'}>
            <body
                className={cn(
                    'h-full bg-gray-100 overflow-hidden cursor-genshin font-genshin',
                    genshinFont.variable
                )}
            >
                {children}
                <Toaster />
            </body>
            <Script
                data-domain={'retainer.cloud'}
                data-api={'/informant/icy-leaf-47fa/event'}
                src={'/informant/icy-leaf-47fa/script.js'}
            />
        </html>
    );
}
