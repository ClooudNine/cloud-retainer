import Image from 'next/image';
import confirmationModal from '@/public/wish-simulator/assets/confirmation-modal.webp';

const ResetEpitomizedPathModal = ({
    closeResetModal,
    confirmReset,
}: {
    closeResetModal: () => void;
    confirmReset: () => void;
}) => {
    return (
        <section
            className={
                'absolute z-10 top-0 w-full h-full bg-[rgba(0,0,0,0.8)] font-genshin flex justify-center items-center'
            }
        >
            <div
                className={'relative w-full h-full md:w-4/5 md:h-4/5'}
                style={{ containerType: 'inline-size' }}
            >
                <Image
                    src={confirmationModal}
                    alt={'Подтверждение отмены текущего курса'}
                    fill
                    quality={100}
                    className={'-z-10'}
                />
                <p className={'text-[#495366] text-[4cqw] text-center mt-[2.5%]'}>
                    Сообщение
                </p>
                <p
                    className={
                        'w-[70%] text-[#495366] text-center text-[5cqw] md:text-[3cqw] mx-auto mt-[5%] md:mt-[10%]'
                    }
                >
                    Вы уверены, что хотите отменить текущий курс?
                </p>
                <p
                    className={
                        'w-[80%] text-[#f39000] text-center text-[5cqw] md:text-[3cqw] mx-auto'
                    }
                >
                    Отмена курса сбросит накопленные очки Судьбы.
                </p>
                <div className={'w-full h-[10%] flex justify-evenly mt-[6%] md:mt-[13%]'}>
                    <button
                        className={
                            'group w-[40%] cursor-genshin text-[#ece5d8] text-[2.5cqw] bg-[#4a5366] transition-all rounded-full hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-[#ffe6b2] active:bg-[#ffeccb] active:outline-[#b5b2ae]'
                        }
                        onClick={() => closeResetModal()}
                    >
                        <div
                            className={
                                'absolute flex justify-center items-center ml-2 w-[4cqw] h-[4cqw] bg-[#313131] place-self-start rounded-full group-active:opacity-50'
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
                            'group w-[40%] cursor-genshin text-[#ece5d8] text-[2.5cqw] bg-[#4a5366] transition-all rounded-full hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-[#ffe6b2] active:bg-[#ffeccb] active:outline-[#b5b2ae]'
                        }
                        onClick={() => confirmReset()}
                    >
                        <div
                            className={
                                'absolute flex justify-center items-center ml-2 w-[4cqw] h-[4cqw] bg-[#313131] place-self-start rounded-full group-active:opacity-50'
                            }
                        >
                            <div
                                className={
                                    'h-[50%] w-[50%] border-2 border-[#f3c433] rounded-full'
                                }
                            ></div>
                        </div>
                        Подтвердить
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ResetEpitomizedPathModal;
