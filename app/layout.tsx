import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';
import { cn } from '@/lib/utils';

export const metadata = {
    title: 'Cloud Retainer | Best Genshin Impact Companion',
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
        <html lang="ru" className={'h-full text-[max(4px,1.1vmax)]'}>
            <body
                className={cn(
                    'h-full bg-background cursor-genshin font-genshin antialiased',
                    genshinFont.variable
                )}
            >
                {children}
            </body>
            <Script
                data-domain={'retainer.cloud'}
                data-api={'/informant/icy-leaf-47fa/event'}
                src={'/informant/icy-leaf-47fa/script.js'}
            />
        </html>
    );
}
