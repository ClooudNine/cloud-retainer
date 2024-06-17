'use client';
import { ChangeEvent, useMemo, useState } from 'react';
import { New } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Label } from '@/components/ui/label';

const NewsList = ({ news }: { news: New[] }) => {
    const [filters, setFilters] = useState({ title: '', startDate: '', endDate: '' });

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredNews = useMemo(() => {
        let filtered = news;

        if (filters.title) {
            filtered = filtered.filter((newsItem) =>
                newsItem.title.toLowerCase().includes(filters.title.toLowerCase())
            );
        }

        if (filters.startDate && filters.endDate) {
            const startDate = new Date(filters.startDate);
            const endDate = new Date(filters.endDate);
            filtered = filtered.filter((newsItem) => {
                const newsDate = newsItem.publishDate;
                return newsDate >= startDate && newsDate <= endDate;
            });
        }

        return filtered;
    }, [news, filters]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                <Input
                    name="title"
                    placeholder="🔍 Поиск по заголовку"
                    value={filters.title}
                    onChange={handleFilterChange}
                    className="text-center border-black"
                />
                <Label className="flex items-center">От</Label>
                <Input
                    name="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="border-black"
                />
                <Label className="flex items-center">До</Label>
                <Input
                    name="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="border-black"
                />
            </div>
            <div className={'flex flex-wrap'}>
                {filteredNews.map((newsItem) => (
                    <Link
                        href={`/news/${newsItem.id}`}
                        key={newsItem.title}
                        className={
                            'group basis-1/3 space-y-1 bg-gray-300 rounded-xl p-2 transition hover:bg-blue-300 hover:text-white'
                        }
                    >
                        <h3 className={'text-xl'}>{newsItem.title}</h3>
                        <Image
                            alt={newsItem.title}
                            src={`common/news/${newsItem.id}.webp`}
                            width={300}
                            height={150}
                            className={'w-full h-56 rounded-xl object-cover transition group-hover:scale-105'}
                        />
                        <p className={'text-xs text-right'}>{newsItem.publishDate.toLocaleDateString()}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
