import PencilIcon from '@/components/icons/pencil';

const EditBannerButton = () => {
    return (
        <button className={'p-2 rounded bg-gray-200 transition hover:bg-gray-500'}>
            <PencilIcon />
        </button>
    );
};

export default EditBannerButton;
