const Cancel = ({ handler }: { handler: () => void }) => {
    return (
        <button
            className={
                'group w-2/5 flex items-center cursor-genshin text-[#ece5d8] text-[2.5cqw] bg-[#4a5366] transition rounded-full hover:ring-4 hover:ring-[#ffe6b2] active:bg-[#ffeccb] active:ring-[#b5b2ae]'
            }
            onClick={handler}
        >
            <div
                className={
                    'size-[2vw] bg-[#313131] ml-2 rounded-full group-active:opacity-50'
                }
            >
                <svg
                    fill="none"
                    stroke="#389ddc"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="m6.9949 7.0064c-0.39053 0.39053-0.39053 1.0237 0 1.4142l3.5851 3.5851-3.5851 3.5852c-0.39053 0.3905-0.39053 1.0237 0 1.4142 0.39052 0.3905 1.0237 0.3905 1.4142 0l3.5851-3.5852 3.5852 3.5852c0.3905 0.3905 1.0237 0.3905 1.4142 0s0.3905-1.0237 0-1.4142l-3.5852-3.5852 3.5852-3.5851c0.3905-0.39052 0.3905-1.0237 0-1.4142-0.3906-0.39053-1.0237-0.39053-1.4142 0l-3.5852 3.5851-3.5851-3.5851c-0.39052-0.39052-1.0237-0.39052-1.4142 0z"
                        fill="#389ddc"
                    />
                </svg>
            </div>
            <p className={'mx-auto'}>Отмена</p>
        </button>
    );
};

export default Cancel;
