import { useTranslations } from 'next-intl';

const Day = ({ date }: { date: Date }) => {
    const t = useTranslations('months');
    const day = date.getDate();
    const isFirstOfMonth = day === 1;

    return (
        <div className={'relative w-10 text-center shrink-0 max-xl:text-lg'}>
            {isFirstOfMonth && <p className={'absolute -top-4 text-blue-500'}>{t(`${date.getMonth()}`)}</p>}
            {day}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 h-[98%] border-l border-gray-400"></div>
        </div>
    );
};

export default Day;
