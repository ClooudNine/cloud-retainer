import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ['ru', 'en'],
		defaultLocale: 'ru',
		localeDetection: false
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/ru',
				permanent: true,
				locale: false,
			},
		];
	},
	images: {
		loader: 'custom',
		loaderFile: './lib/image-loader.ts'
	}
};

export default withNextIntl(nextConfig);
