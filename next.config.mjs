import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Forwarded-Host',
						value: 'retainer.cloud',
					},
				],
			},
		];
	},
	images: {
		loader: 'custom',
		loaderFile: './lib/image-loader.ts'
	}
};

export default withNextIntl(nextConfig);
