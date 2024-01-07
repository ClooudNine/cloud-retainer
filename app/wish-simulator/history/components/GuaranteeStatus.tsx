import clsx from 'clsx';
import { Rares } from '@/lib/db/schema';

const GuaranteeStatus = ({ bannerType, rare }: { bannerType: string; rare: Rares }) => {
    const statusStorageName = `${rare === '5' ? 'five' : 'four'}StarGuaranteed`;
    const guaranteeStatusClasses = clsx('text-[3vw] md:text-[1vw] [&_em]:not-italic', {
        'text-[#9659c7]': rare === '4',
        'text-[#bd6932]': rare === '5',
    });
    return (
        <p className={guaranteeStatusClasses}>
            Текущий статус гаранта {rare}★:
            {JSON.parse(localStorage.getItem(bannerType)!)[statusStorageName] ? (
                <em className={'text-green-500'}> Да</em>
            ) : (
                <em className={'text-red-600'}> Нет</em>
            )}
        </p>
    );
};

export default GuaranteeStatus;
