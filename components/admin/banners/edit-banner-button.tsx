import { Pencil1Icon } from '@radix-ui/react-icons';

const EditBannerButton = ({ setBanner }: { setBanner: () => void }) => {
    return (
        <button
            className={'bg-gray-200 p-2 rounded-lg transition hover:bg-gray-400'}
            onClick={setBanner}
        >
            <Pencil1Icon className={'size-6 stroke-current stroke-1'} />
        </button>
    );
};

export default EditBannerButton;
