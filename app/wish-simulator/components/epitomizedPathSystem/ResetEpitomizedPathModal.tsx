import Image from 'next/image';
import confirmationModal from '@/public/wish-simulator/assets/confirmation-modal.webp';
import Cancel from '@/app/wish-simulator/components/actionButtons/Cancel';
import Confirm from '@/app/wish-simulator/components/actionButtons/Confirm';

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
                'absolute top-0 z-10 bg-black/40 w-full h-full flex justify-center items-center'
            }
        >
            <div className={'relative flex flex-col justify-between items-center'}>
                <Image
                    src={confirmationModal}
                    alt={'Подтверждение отмены текущего курса'}
                    quality={100}
                    draggable={false}
                    className={'w-[95%] lg:w-full'}
                />
                <p className={'absolute text-[#495366] text-3xl top-[5%]'}>Сообщение</p>
                <p className={'absolute text-[#495366] text-center text-2xl top-[40%]'}>
                    Вы уверены, что хотите отменить текущий курс?
                    <br />
                    <em className={'text-[#f39000] not-italic'}>
                        Отмена курса сбросит накопленные очки.
                    </em>
                </p>
                <div className={'absolute w-full flex justify-evenly bottom-[8%]'}>
                    <Cancel handler={closeResetModal} />
                    <Confirm
                        title={'Подтвердить'}
                        handler={confirmReset}
                        disabledCondition={false}
                    />
                </div>
            </div>
        </section>
    );
};

export default ResetEpitomizedPathModal;
