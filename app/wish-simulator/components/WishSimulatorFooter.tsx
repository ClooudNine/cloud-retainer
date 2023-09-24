import FooterButton from "@/app/wish-simulator/components/footerComponents/FooterButton";
import WishButton from "@/app/wish-simulator/components/footerComponents/WishButton";
import MasterlessCurrency from "@/app/wish-simulator/components/footerComponents/MasterlessCurrency";
const WishSimulatorFooter = () => {
    return (
        <footer className={"flex justify-between pb-6 z-10 px-4 md:px-8 lg:px-16"}>
            <div className={"flex flex-col w-1/2 gap-2 md:w-2/5"}>
                <div className={"flex h-1/4 gap-8 md:h-1/2"}>
                    <MasterlessCurrency title={"Блуждающий звёздный блеск"} path={"masterless-starglitter"} />
                    <MasterlessCurrency title={"Блуждающая звёздная пыль"} path={"masterless-stardust"} />
                </div>
                <div className={"h-4/5 flex flex-col gap-2 items-start md:flex-row md:items-end md:gap-4 md:h-1/2"}>
                    <FooterButton title={"Магазин"} />
                    <FooterButton title={"Детали"} />
                    <FooterButton title={"История"} />
                </div>
            </div>
            <div className={"flex flex-col w-[55%] items-end justify-end gap-4 md:flex-row"}>
                <WishButton count={1}/>
                <WishButton count={10}/>
            </div>
        </footer>
    )
}
export default WishSimulatorFooter