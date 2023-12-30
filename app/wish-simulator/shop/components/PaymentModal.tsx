import Image from 'next/image';
import epitomizedPathResetModal from '@/public/wish-simulator/assets/epitomized-path-reset-modal.webp';
import star from '@/public/common/star.webp';
import { useState } from 'react';
import { PullCurrency } from '@/lib/common';

const shopItemsTranslate: { [key in PullCurrency]: string } = {
    'intertwined-fate': 'Переплетающиеся судьбы',
    'acquaint-fate': 'Судьбоносные встречи',
};

const PaymentModal = ({
    shopItem,
    closePaymentModal,
}: {
    shopItem: PullCurrency;
    closePaymentModal: () => void;
}) => {
    const [itemCount, setItemCount] = useState<number>(1);
    const confirmPayment = () => {
        let balance = JSON.parse(localStorage.getItem('Balance')!);
        balance[shopItem] += itemCount;
        localStorage.setItem('Balance', JSON.stringify(balance));
    };
    return (
        <section
            className={
                'absolute z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center'
            }
        >
            <div className={'relative'}>
                <Image src={epitomizedPathResetModal} alt={'Покупка'} width={800} />
                <p
                    className={
                        'w-full text-center absolute top-[4%] text-[1.8vw] text-[#475467]'
                    }
                >
                    Получить предмет
                </p>
                <div
                    className={
                        'absolute w-[81%] h-[30%] top-[18%] left-[10%] flex bg-[linear-gradient(170deg,_rgba(135,120,117,1)_0%,_rgba(229,185,114,1)_100%)]'
                    }
                >
                    <Image
                        src={`/wish-simulator/assets/${shopItem}.webp`}
                        alt={shopItem}
                        width={150}
                        height={150}
                        className={'h-full w-auto'}
                    />
                    <div>
                        <p className={'text-[#efe2d8] text-[1.2vw]'}>
                            {shopItemsTranslate[shopItem]}
                        </p>
                        <div className={'h-[15%] flex gap-1'}>
                            {Array.from(Array(5).keys()).map((number) => (
                                <Image
                                    key={number}
                                    src={star}
                                    alt={'Звезда'}
                                    className={'h-full w-auto drop-shadow'}
                                />
                            ))}
                        </div>
                        <p className={'text-[#efe2d8] text-[1vw]'}>
                            Судьбоносный камень, который соединяет мечты.
                        </p>
                    </div>
                </div>
                <p
                    className={
                        'w-full absolute top-[48%] text-center text-[#576074] text-[1vw]'
                    }
                >
                    Количество
                </p>
                <p
                    className={
                        'w-full absolute top-[54%] text-center text-[#576074] text-[1.5vw]'
                    }
                >
                    {itemCount}
                </p>
                <input
                    type={'range'}
                    defaultValue={'1'}
                    min={'1'}
                    max={'100'}
                    onChange={(e) => setItemCount(Number(e.currentTarget.value))}
                    className={'absolute top-[65%] left-[20%] w-[60%] cursor-genshin'}
                />
                <p></p>
                <div className={'absolute flex justify-evenly w-full h-[10%] top-[83%]'}>
                    <button
                        className={
                            'group w-[40%] cursor-genshin text-[#ece5d8] text-[1.2vw] bg-[#4a5366] transition-all rounded-full hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-[#ffe6b2] active:bg-[#ffeccb] active:outline-[#b5b2ae]'
                        }
                        onClick={closePaymentModal}
                    >
                        <div
                            className={
                                'absolute flex justify-center items-center ml-2 w-[2vw] h-[2vw] bg-[#313131] place-self-start rounded-full group-active:opacity-50'
                            }
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#389ddc"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                        fill="#389ddc"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        Отмена
                    </button>
                    <button
                        className={
                            'group w-[40%] cursor-genshin text-[#ece5d8] text-[1.2vw] bg-[#4a5366] transition-all rounded-full hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-[#ffe6b2] active:bg-[#ffeccb] active:outline-[#b5b2ae]'
                        }
                        onClick={confirmPayment}
                    >
                        <div
                            className={
                                'absolute flex justify-center items-center ml-2 w-[2cqw] h-[2cqw] bg-[#313131] place-self-start rounded-full group-active:opacity-50'
                            }
                        >
                            <div
                                className={
                                    'h-[50%] w-[50%] border-2 border-[#f3c433] rounded-full'
                                }
                            ></div>
                        </div>
                        Обменять
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PaymentModal;
