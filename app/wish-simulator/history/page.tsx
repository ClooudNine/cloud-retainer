import Background from '@/components/wish-simulator/background';
import Image from 'next/image';
import bookBackground from '@/public/wish-simulator/assets/book-background.webp';
import Link from 'next/link';
import UserSelect from '@/components/wish-simulator/history/user-select';
import HistoryTable from '@/components/wish-simulator/history/history-table';
import { WishHistoryTypes } from '@/lib/banners';
import WishCrossIcon from '@/components/icons/wish-cross';
import Logo from '@/components/main-page/logo';

export const metadata = {
    title: 'Cloud Retainer | Симулятор молитв - История',
    description: 'Здесь отображены все сделанные молитвы в симуляторе',
};

export default function WishHistory({
    searchParams,
}: {
    searchParams: {
        type: WishHistoryTypes;
    };
}) {
    return (
        <main className={'w-full h-full flex items-center justify-center'}>
            <Background isBlurred={true} />
            <div
                className={
                    'relative flex justify-center items-center h-[85vh] w-[45vh] xs:w-[150vh] xs:h-auto'
                }
            >
                <Logo styles={'absolute top-0 right-0 hidden'} />
                <Image
                    src={bookBackground}
                    quality={100}
                    alt={'История молитв'}
                    draggable={false}
                    className={
                        'max-w-none w-[85vh] -rotate-90 -scale-y-100 xs:rotate-0 xs:scale-y-100 xs:max-w-full xs:w-[150vh] xs:h-auto'
                    }
                />
                <p
                    className={
                        'absolute text-[#595252] top-[8%] left-[12.5%] text-3xl xs:top-[5%] xs:left-[14%]'
                    }
                >
                    Журнал Молитв
                </p>
                <UserSelect type={searchParams['type']} />
                <Link
                    href={'/wish-simulator'}
                    className={
                        'absolute cursor-genshin top-[2.5%] right-[7%] xs:top-[6.2%] xs:right-[2.4%]'
                    }
                >
                    <WishCrossIcon fillColor={'#e9d5af'} />
                </Link>
                <HistoryTable type={searchParams['type']} />
            </div>
        </main>
    );
}
