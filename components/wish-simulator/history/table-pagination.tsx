import HistoryArrowIcon from '@/components/icons/history-arrow';

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
                'absolute flex items-center justify-center w-full gap-16 bottom-[8%] print:hidden'
            }
        >
            <button
                className={
                    'w-8 cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60'
                }
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
            >
                <HistoryArrowIcon isRotated={false} />
            </button>
            <p className={'text-[#595252] text-2xl'}>{currentPage}</p>
            <button
                className={
                    'w-8 cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60'
                }
                disabled={currentPage === Math.ceil(wishCount / 5)}
                onClick={() => setPage(currentPage + 1)}
            >
                <HistoryArrowIcon isRotated={true} />
            </button>
        </div>
    );
};

export default TablePagination;
