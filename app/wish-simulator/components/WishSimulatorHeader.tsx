import WishSimulatorTitle from "@/app/wish-simulator/components/headerComponents/WishSimulatorTitle";
import BannerList from "@/app/wish-simulator/components/headerComponents/BannerList";
import CurrentBalance from "@/app/wish-simulator/components/headerComponents/CurrentBalance";
import CloseButton from "@/app/wish-simulator/components/headerComponents/CloseButton";
const WishSimulatorHeader = () => {
    return (
        <header className={"grid grid-cols-12 grid-rows-2 md:grid-rows-1"}>
            <WishSimulatorTitle />
            <BannerList/>
            <CurrentBalance/>
            <CloseButton />
        </header>
    )
}
export default  WishSimulatorHeader