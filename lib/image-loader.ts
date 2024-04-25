'use client';

export default function imageLoader({ src }: { src: string }) {
    return `https://content.retainer.cloud/${src}`;
}
