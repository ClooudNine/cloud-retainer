import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/navigation';

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) notFound();

    const response = await fetch(`https://content.retainer.cloud/common/dictionaries/${locale}.json`, {
        cache: 'force-cache',
    });

    if (!response.ok) {
        throw new Error(`Failed to load ${locale} translations`);
    }

    return {
        messages: await response.json(),
    };
});
