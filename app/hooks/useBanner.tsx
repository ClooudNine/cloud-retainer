import {useState} from "react";

export default function useBanner() {
    const [banner, setBanner] = useState<number>(1);
    const [bannerItems, setBannerItems] = useState<{}>({});
    function handleBanner(bannerId: number) {
        setBanner(bannerId);
    }
    return [banner, bannerItems];
}