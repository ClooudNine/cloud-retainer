import FooterButton from "@/app/wish-simulator/components/footerComponents/FooterButton";
import WishButton from "@/app/wish-simulator/components/footerComponents/WishButton";
import MasterlessCurrency from "@/app/wish-simulator/components/footerComponents/MasterlessCurrency";
const WishSimulatorFooter = () => {
    return (
        <footer className={"flex pb-[3vh] z-10 mx-4 gap-2 md:mx-8 lg:mx-16"}>
            <div className={"flex flex-col w-2/5 gap-2 sm:gap-0"}>
                <div className={"flex h-1/4 gap-4 items-end sm:h-1/2"}>
                    <MasterlessCurrency title={"Блуждающий звёздный блеск"} path={"masterless-starglitter"} />
                    <MasterlessCurrency title={"Блуждающая звёздная пыль"} path={"masterless-stardust"} />
                </div>
                <div className={"flex h-4/5 flex-col gap-2 items-start sm:flex-row sm:items-end sm:gap-4 sm:h-1/2"}>
                    <FooterButton title={"Магазин"} />
                    <FooterButton title={"Детали"} />
                    <FooterButton title={"История"} />
                </div>
            </div>
            <div className={"flex flex-col w-3/5 h-full place-self-end items-end justify-end gap-4 sm:flex-row sm:h-[90%]"}>
                <WishButton count={1}/>
                <WishButton count={10}/>
            </div>
        </footer>
    )
}
export default WishSimulatorFooter