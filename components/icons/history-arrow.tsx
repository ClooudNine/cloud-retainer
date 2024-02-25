const HistoryArrowIcon = ({ isRotated }: { isRotated: boolean }) => {
    return (
        <svg
            fill="none"
            stroke="#595252"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`s-8 ${isRotated && 'rotate-180'}`}
        >
            <path
                d="m14.289 5.7071c-0.3905-0.39053-1.0236-0.39053-1.4142 0l-4.8874 4.8922c-0.78039 0.7812-0.78008 2.047 6.9e-4 2.8277l4.8903 4.8904c0.3906 0.3905 1.0237 0.3905 1.4143 0 0.3905-0.3905 0.3905-1.0237 0-1.4142l-4.1857-4.1857c-0.39052-0.3905-0.39052-1.0236 0-1.4142l4.182-4.182c0.3906-0.39052 0.3906-1.0237 0-1.4142z"
                fill="#595252"
            />
        </svg>
    );
};

export default HistoryArrowIcon;
