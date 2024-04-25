import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const toLink = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
};

export const toTitle = (link: string) => {
    return link.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
