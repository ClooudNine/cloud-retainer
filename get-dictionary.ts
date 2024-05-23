import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
    ru: () =>
        fetch(`https://content.retainer.cloud/common/dictionaries/ru.json`).then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Failed to load dictionary for locale 'ru': ${response.statusText}`
                );
            }
            return response.json();
        }),
    en: () =>
        fetch(`https://content.retainer.cloud/common/dictionaries/en.json`).then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Failed to load dictionary for locale 'en': ${response.statusText}`
                );
            }
            return response.json();
        }),
};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? (await dictionaries.ru());
