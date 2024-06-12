import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/',
	images: {
		loader: 'custom',
		loaderFile: './lib/image-loader.ts'
	}
};

export default withNextIntl(nextConfig);
