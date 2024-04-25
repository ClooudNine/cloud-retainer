import clsx from 'clsx';

import { Rares } from '@/lib/types';

const GuaranteeStatus = ({ status, rare }: { status: boolean; rare: Rares }) => {
    const guaranteeStatusClasses = clsx('[&_em]:not-italic', {
        'text-[#9659c7]': rare === '4',
        'text-[#bd6932]': rare === '5',
    });
    return (
        <p className={guaranteeStatusClasses}>
            Текущий статус гаранта {rare}★:
            {status ? (
                <em className={'text-green-500'}> Да</em>
            ) : (
                <em className={'text-red-600'}> Нет</em>
            )}
        </p>
    );
};

export default GuaranteeStatus;
