import {Dialog, DialogContent} from "@/components/ui/dialog";
import CharacterBannerForm from "@/components/admin/banners/character-banner-form";
import {Character, CharacterBanner} from "@/lib/db/schema";
import {Banners} from "@/lib/banners";

const EditBannerModal = ({banner, characters, closeModal}: {banner: Banners | null, characters: Character[], closeModal: () => void}) => {
    return (
        <Dialog open={Boolean(banner)}>
            <DialogContent className={'max-w-none w-[70vw]'}>
                {banner && (
                    <CharacterBannerForm
                        banner={banner as CharacterBanner}
                        characters={characters}
                        closeEdit={closeModal}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default EditBannerModal;