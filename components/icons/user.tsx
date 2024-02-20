const UserIcon = () => {
    return (
        <svg
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={'w-8'}
        >
            <g stroke="#000">
                <path
                    d="m16 7c0 2.2091-1.7909 4-4 4-2.2091 0-4-1.7909-4-4s1.7909-4 4-4c2.2091 0 4 1.7909 4 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
                <path
                    d="m12 14c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </g>
        </svg>
    );
};

export default UserIcon;
