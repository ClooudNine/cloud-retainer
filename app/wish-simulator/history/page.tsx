import Background from '@/app/wish-simulator/components/Background';
import Image from 'next/image';
import bookBackground from '@/public/wish-simulator/assets/book-background.webp';
import Link from 'next/link';
import Title from '@/app/wish-simulator/history/components/Title';
import UserSelect from '@/app/wish-simulator/history/components/UserSelect';
import HistoryTable from '@/app/wish-simulator/history/components/HistoryTable';
import { WishHistoryTypes } from '@/lib/banners';

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
        <main
            className={
                'w-full h-full flex items-center justify-center font-genshin cursor-genshin'
            }
        >
            <Background isBlurred={true} />
            <div
                style={{ containerType: 'inline-size' }}
                className={
                    'flex justify-center items-center h-[85vh] w-[45vh] sm:w-[150vh] sm:h-auto'
                }
            >
                <Image
                    src={bookBackground}
                    quality={100}
                    alt={'История молитв'}
                    draggable={false}
                    className={
                        'max-w-none w-[85vh] -rotate-90 -scale-y-100 sm:rotate-0 sm:scale-y-100 sm:max-w-full sm:w-[150vh] sm:h-auto'
                    }
                />
                <Title />
                <UserSelect type={searchParams['type']} />
                <Link
                    href={'/wish-simulator'}
                    className={
                        'absolute cursor-genshin top-[2.5%] right-[7%] sm:top-[6.2%] sm:right-[2.4%]'
                    }
                >
                    <svg
                        className={'w-[5cqw] sm:w-[3.5cqw]'}
                        transform="rotate(45)"
                        fill="#000000"
                        stroke="#000000"
                        strokeWidth=".00016"
                        version="1.1"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
                            fill="#e9d5af"
                        />
                    </svg>
                </Link>
                <HistoryTable type={searchParams['type']} />
            </div>
        </main>
    );
}
