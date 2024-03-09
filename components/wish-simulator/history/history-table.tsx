'use client';
import { useCallback, useEffect, useState } from 'react';
import { BaseBannerStatsWithGuaranteed, WishHistoryTypes } from '@/lib/banners';
import TablePagination from '@/components/wish-simulator/history/table-pagination';
import GuaranteeStatus from '@/components/wish-simulator/history/guarantee-status';
import { initialBannerStats } from '@/lib/constants';
import TrashIcon from '@/components/icons/trash';

const HistoryTable = ({ type }: { type: WishHistoryTypes }) => {
    const [stats, setStats] = useState<BaseBannerStatsWithGuaranteed | null>(null);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const maybeBannerStats = localStorage.getItem('bannerStats');
        if (maybeBannerStats) {
            setStats(JSON.parse(maybeBannerStats)[type]);
            setPage(1);
        }
    }, [type]);

    const getWishesFromLastItem = (rare: number) => {
        const wishesCount = stats?.history.findIndex(
            (wish) => Number(wish.item.rare) === rare
        );
        if (wishesCount === -1) return stats?.history.length;
        return wishesCount;
    };

    const removeHistory = useCallback(() => {
        if (!stats) return;

        const clearStats = {
            ...stats,
            fourStarCounter: 0,
            fiveStarCounter: 0,
            history: [],
            ...(type === 'CharacterEventWish' || type === 'WeaponEventWish'
                ? { fourStarGuaranteed: false, fiveStarGuaranteed: false }
                : {}),
        };

        const maybeBannerStats = localStorage.getItem('bannerStats');
        const bannerStats = maybeBannerStats
            ? JSON.parse(maybeBannerStats)
            : initialBannerStats;

        bannerStats[type] = clearStats;

        localStorage.setItem('bannerStats', JSON.stringify(bannerStats));
        setStats(clearStats);
        setPage(1);
    }, [stats, type]);

    if (!stats || stats.history.length === 0) {
        return (
            <p
                className={
                    'absolute text-[#595252] w-full top-[45%] text-center text-4xl'
                }
            >
                История по данному типу отсутствует!
            </p>
        );
    }

    return (
        <>
            <div
                className={
                    'absolute w-[86%] h-[70%] top-[17%] left-[9%] overflow-y-scroll genshin-scrollbar xs:top-[22%] xs:w-[84%] xs:h-[63%]'
                }
            >
                <p className={'text-2xl text-[#9a8e8e] xs:text-base'}>
                    Всего молитв сделано: {stats.history.length}
                </p>
                <div className={'flex flex-col text-2xl gap-2 xs:text-base xs:flex-row'}>
                    <div>
                        <p className={'text-[#9659c7]'}>
                            Всего предметов 4★ получено:&nbsp;
                            {
                                stats.history.filter((wish) => wish.item.rare === '4')
                                    .length
                            }
                        </p>
                        <p className={'text-[#bd6932]'}>
                            Всего предметов 5★ получено:&nbsp;
                            {
                                stats.history.filter((wish) => wish.item.rare === '5')
                                    .length
                            }
                        </p>
                    </div>
                    {(type === 'CharacterEventWish' || type === 'WeaponEventWish') && (
                        <div>
                            <GuaranteeStatus
                                status={stats.fourStarGuaranteed}
                                rare={'4'}
                            />
                            <GuaranteeStatus
                                status={stats.fiveStarGuaranteed}
                                rare={'5'}
                            />
                        </div>
                    )}
                    <div>
                        <p className={'text-[#9659c7]'}>
                            С последнего предмета 4★ сделано молитв:&nbsp;
                            {getWishesFromLastItem(4)}
                        </p>
                        <p className={'text-[#bd6932]'}>
                            С последнего предмета 5★ сделано молитв:&nbsp;
                            {getWishesFromLastItem(5)}
                        </p>
                    </div>
                    <div className={'space-y-1.5 w-full xs:w-1/4'}>
                        <button
                            className={
                                'h-12 w-full flex items-center justify-evenly bg-red-300 transition rounded-full gap-2 cursor-genshin p-2 hover:bg-red-500'
                            }
                            onClick={removeHistory}
                        >
                            <TrashIcon />
                            <p>Удалить историю</p>
                        </button>
                    </div>
                </div>
                <table
                    className={
                        'absolute w-[99%] h-4/5 border-2 border-[#dac69f] mt-2 text-xl/tight xs:h-auto xs:text-base/tight'
                    }
                >
                    <thead>
                        <tr
                            className={
                                'border-2 border-[#dac69f] text-[#595252] bg-[#ede1ca]'
                            }
                        >
                            <th
                                className={
                                    'w-1/5 border-2 border-[#dac69f] font-normal p-3'
                                }
                            >
                                Тип
                            </th>
                            <th
                                className={
                                    'w-[30%] border-2 border-[#dac69f] font-normal p-3'
                                }
                            >
                                Имя
                            </th>
                            <th
                                className={
                                    'w-1/4 border-2 border-[#dac69f] font-normal p-3'
                                }
                            >
                                Тип Молитвы
                            </th>
                            <th
                                className={
                                    'w-1/4 border-2 border-[#dac69f] font-normal p-3'
                                }
                            >
                                Время молитвы
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        className={
                            'border-2 border-[#dac69f] text-[#9a8e8e] bg-[#f6f1e7] text-center'
                        }
                    >
                        {stats.history
                            .slice((page - 1) * 5, (page - 1) * 5 + 5)
                            .map((wish, index) => (
                                <tr key={index}>
                                    <td
                                        className={'border-2 border-[#dac69f] p-1 xs:p-4'}
                                    >
                                        {wish.type}
                                    </td>
                                    <td
                                        className={`border-2 border-[#dac69f] p-1 xs:p-4 ${
                                            wish.item.rare === '5'
                                                ? 'text-[#bd6932]'
                                                : wish.item.rare === '4' &&
                                                  'text-[#9659c7]'
                                        }`}
                                    >
                                        {wish.item.name}
                                        {Number(wish.item.rare) > 3 &&
                                            ` (${wish.item.rare}★)`}
                                    </td>
                                    <td
                                        className={'border-2 border-[#dac69f] p-1 xs:p-4'}
                                    >
                                        {wish.wishType}
                                    </td>
                                    <td
                                        className={'border-2 border-[#dac69f] p-1 xs:p-4'}
                                    >
                                        {wish.date}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <TablePagination
                wishCount={stats.history.length}
                currentPage={page}
                setPage={setPage}
            />
        </>
    );
};

export default HistoryTable;
