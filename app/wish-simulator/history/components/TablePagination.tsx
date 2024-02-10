import Image from 'next/image';
import arrow from '@/public/wish-simulator/assets/arrow-prev.svg';

const TablePagination = ({
    wishCount,
    currentPage,
    setPage,
}: {
    wishCount: number;
    currentPage: number;
    setPage: (pageNumber: number) => void;
}) => {
    return (
        <div
            className={
                'absolute flex items-center justify-center w-full gap-16 bottom-[7.5%]'
            }
        >
            <button
                className={
                    'w-8 cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60'
                }
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
            >
                <Image
                    src={arrow}
                    alt={'Предыдущие 5 молитв'}
                    quality={100}
                    draggable={false}
                />
            </button>
            <p className={'text-[#595252] text-3xl'}>{currentPage}</p>
            <button
                className={
                    'w-8 cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60'
                }
                disabled={currentPage === Math.ceil(wishCount / 5)}
                onClick={() => setPage(currentPage + 1)}
            >
                <Image
                    src={arrow}
                    alt={'Следующие 5 молитв'}
                    quality={100}
                    draggable={false}
                    className={'rotate-180'}
                />
            </button>
        </div>
    );
};

export default TablePagination;
