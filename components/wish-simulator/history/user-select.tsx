'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { bannerHistoryTypes } from '@/lib/constants';
import { WishHistoryTypes } from '@/lib/types';
import { ChevronUp } from 'lucide-react';

export const UserSelect = ({ type }: { type: WishHistoryTypes }) => {
    const router = useRouter();
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

    return (
        <div
            className={
                'absolute flex items-center text-[#595252] w-[87%] top-[13%] left-[8%] text-base xs:text-xl xs:w-[85%]'
            }
        >
            <Image
                src={'wish-simulator/assets/select-wish-type.webp'}
                width={1176}
                height={71}
                alt={'Фон выбора типа молитвы'}
                draggable={false}
                className={'w-full'}
            />
            <p className={'absolute left-[4%] xs:left-[8%]'}>Тип Молитвы</p>
            <div className="absolute w-[70%] text-[#595252] right-[1%]">
                <div className="flex items-center mx-3" onClick={() => setIsSelectOpen(!isSelectOpen)}>
                    <p className={'truncate'}>{bannerHistoryTypes[type]}</p>
                    <ChevronUp className={`size-10 ml-auto ${isSelectOpen ? 'rotate-0' : 'rotate-180'}`} />
                </div>
                {isSelectOpen && (
                    <div className="z-10 absolute w-[140%] top-0 right-0 text-white bg-[rgba(95,101,114,0.9)] rounded-3xl mt-[8%] xs:w-full">
                        {Object.entries(bannerHistoryTypes).map((option) => (
                            <div
                                key={option[0]}
                                className={'px-8 py-6 rounded-full hover:bg-[#717887]'}
                                onClick={() => {
                                    setIsSelectOpen(false);
                                    router.replace(`/wish-simulator/history/?type=${option[0]}`);
                                }}
                            >
                                {option[1]}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserSelect;
