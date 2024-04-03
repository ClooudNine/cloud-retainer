import PencilIcon from "@/components/icons/pencil";

const EditBannerButton = ({setBanner}: {setBanner: () => void}) => {
    return (
        <button
            className={
                'bg-gray-200 p-2 rounded-lg transition hover:bg-gray-400'
            }
            onClick={setBanner}
        >
            <PencilIcon/>
        </button>
    )
}

export default EditBannerButton;