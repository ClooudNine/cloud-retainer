const ArrowExpanderIcon = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <svg
            className={`w-8 ml-auto ${isOpen ? 'rotate-0' : 'rotate-180'}`}
            fill="#595252"
            version="1.1"
            viewBox="0 -4.5 20 20"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g fill="none" fillRule="evenodd" strokeWidth="1">
                <g transform="translate(-260 -6684)" fill="#595252">
                    <g transform="translate(56 160)">
                        <path d="m223.71 6534.6c0.38974-0.4049 0.38974-1.0604 0-1.4643l-8.2636-8.5629c-0.78049-0.80876-2.0467-0.80876-2.8271 0l-8.3245 8.6251c-0.38575 0.40075-0.39074 1.048-0.009993 1.4539 0.38874 0.41526 1.0293 0.4194 1.4241 0.0114l7.617-7.894c0.39074-0.4049 1.0233-0.4049 1.4141 0l7.557 7.8308c0.38974 0.4049 1.0233 0.4049 1.4131 0" />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default ArrowExpanderIcon;
