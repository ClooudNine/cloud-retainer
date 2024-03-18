/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './lib/image-loader.ts',
    },
};

module.exports = nextConfig;
