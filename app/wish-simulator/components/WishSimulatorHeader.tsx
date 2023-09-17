import WishSimulatorTitle from "@/app/wish-simulator/components/headerComponents/WishSimulatorTitle";
import BannerList from "@/app/wish-simulator/components/headerComponents/BannerList";
import CurrentBalance from "@/app/wish-simulator/components/headerComponents/CurrentBalance";
import CloseButton from "@/app/wish-simulator/components/headerComponents/CloseButton";
const WishSimulatorHeader = () => {
    return (
        <header className={"flex justify-between items-center"}>
            <WishSimulatorTitle />
            <BannerList/>
            <CurrentBalance/>
            <CloseButton />
        </header>
    )
}
export default  WishSimulatorHeader