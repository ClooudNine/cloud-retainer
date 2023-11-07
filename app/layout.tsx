import './globals.css';
import localFont from 'next/font/local';

export const metadata = {
	title: 'Genshin World',
	description: `Крупный проект по игре Genshin Impact, который содержит в себе всё, 
  что нужно путешественникам: игровые персонажи, оружия, симулятор и история молитв, 
  калькуляторы и многое другое.`
};

const genshinFont = localFont({
	src: '../public/fonts/Genshin Impact.woff2',
	display: 'swap',
	variable: '--font-genshin'
});

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru' className={`${genshinFont.variable}`}>
			<body>{children}</body>
		</html>
	);
}
