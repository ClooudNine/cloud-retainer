import clsx from 'clsx';

const GenesisIcon = ({ isActiveSection }: { isActiveSection: boolean }) => {
    const iconClasses = clsx('z-10 size-7 ml-6', {
        'fill-[#3b4254]': isActiveSection,
        'fill-[#ece5d7] group-active:fill-[#3b4254]': !isActiveSection,
    });

    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClasses}
        >
            <g transform="translate(-5 26) scale(.063 -.063)">
                <path d="m170 393c-59-10-90-25-90-44 0-22 47-150 60-163 5-5 15 7 24 28 8 20 22 39 31 42 23 9 19 17-30 47-25 16-45 31-45 33 0 5 42-12 80-31l30-16v34c0 18 7 43 16 55 15 21 14 22-18 21-18-1-44-4-58-6z" />
                <path d="m293 379c9-13 17-38 17-56v-34l30 16c38 20 80 36 80 31 0-3-17-15-37-28s-41-26-46-29c-5-4 3-18 17-32s26-37 26-52c0-22-4-25-34-25-19 0-38 4-41 10-14 23-25 7-25-40 0-27-4-50-10-50-5 0-10 23-10 50 0 49-6 59-26 41-5-5-26-11-47-13l-38-3 53-62c29-35 59-63 68-63 18 0 78 66 123 135 27 42 67 145 67 176 0 21-44 38-124 46l-59 6 16-24z" />
                <path d="m241 271c-8-5-9-11-3-15 5-3 12 1 16 9 6 17 6 18-13 6z" />
                <path d="m287 265c3-8 9-12 14-9 12 7 11 11-5 17-10 4-13 1-9-8z" />
            </g>
        </svg>
    );
};

export default GenesisIcon;
