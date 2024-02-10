const Confirm = ({
    title,
    handler,
    disabledCondition,
}: {
    title: string;
    handler: () => void;
    disabledCondition: boolean;
}) => {
    return (
        <button
            disabled={disabledCondition}
            className={
                'group w-72 py-2 flex items-center cursor-genshin text-[#ece5d8] text-xl bg-[#4a5366] transition rounded-full hover:ring-4 hover:ring-[#ffe6b2] active:bg-[#ffeccb] active:ring-[#b5b2ae] disabled:bg-opacity-0 disabled:ring-2 disabled:ring-[#d4d2d0] disabled:text-[#d3d0ca]'
            }
            onClick={handler}
        >
            <div
                className={
                    'flex justify-center items-center ml-2 size-7 bg-[#313131] rounded-full group-active:opacity-50 group-disabled:opacity-30'
                }
            >
                <div
                    className={
                        'size-1/2 bg-[#313131] border border-[#f3c433] rounded-full lg:border-2'
                    }
                ></div>
            </div>
            <p className={'mx-auto'}>{title}</p>
        </button>
    );
};

export default Confirm;
