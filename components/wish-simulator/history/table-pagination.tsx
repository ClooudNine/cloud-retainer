import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

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
                'absolute flex items-center justify-center w-full gap-16 bottom-[8%]'
            }
        >
            <button
                className={
                    'w-8 cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60'
                }
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
            >
                <ChevronLeftIcon className={'size-8 stroke-[#595252] stroke-1'} />
            </button>
            <p className={'text-[#595252] text-2xl'}>{currentPage}</p>
            <button
                className={
                    'w-8 cursor-genshin rounded-full bg-[#ede8e0] border border-[#ded2c1] disabled:opacity-60'
                }
                disabled={currentPage === Math.ceil(wishCount / 5)}
                onClick={() => setPage(currentPage + 1)}
            >
                <ChevronRightIcon className={'size-8 stroke-[#595252] stroke-1'} />
            </button>
        </div>
    );
};

export default TablePagination;
