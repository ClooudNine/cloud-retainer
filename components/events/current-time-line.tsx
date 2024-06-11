import { CSSProperties, useEffect, useState } from 'react';

const CurrentTimeLine = ({ todayIndex }: { todayIndex: number }) => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const getCurrentTimePosition = (): CSSProperties => {
        if (todayIndex === -1 || !currentTime) {
            return { display: 'none' };
        }

        const dayWidth = 2.5;
        const leftPosition = todayIndex * dayWidth + (currentTime.getHours() / 24) * dayWidth + 2.3;

        return { left: `${leftPosition}rem` };
    };

    return (
        <>
            <div className="absolute top-0 bottom-0 w-0.5 bg-red-500/70" style={getCurrentTimePosition()} />
            <div
                className="absolute bg-red-500/70 text-white p-1 rounded top-7 text-sm"
                style={{ ...getCurrentTimePosition(), transform: 'translate(-50%, -100%)' }}
            >
                {currentTime?.toLocaleTimeString()}
            </div>
        </>
    );
};

export default CurrentTimeLine;
