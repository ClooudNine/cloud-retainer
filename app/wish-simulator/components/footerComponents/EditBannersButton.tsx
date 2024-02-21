import SettingsIcon from '@/components/icons/settings';

const EditBannersButton = () => {
    return (
        <>
            <button
                className={
                    'rounded-full transition bg-[#ede6d6] duration-500 p-1 ring-4 ring-[rgba(237,230,214,0.5)] cursor-genshin hover:ring-[#fcfdff] hover:ring-4 hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] active:ring-[#7a8ca4] active:ring-4 active:bg-[#c8c4bb] lg:ring-8 hover:rotate-180'
                }
            >
                <SettingsIcon />
            </button>
        </>
    );
};

export default EditBannersButton;
