import FooterButton from "@/app/wish-simulator/components/footerComponents/FooterButton";
import WishButton from "@/app/wish-simulator/components/footerComponents/WishButton";
import MasterlessCurrency from "@/app/wish-simulator/components/footerComponents/MasterlessCurrency";

const Footer = () => {
  return (
    <footer className={"flex justify-between pb-4 z-10 px-4 md:px-8 lg:px-16"}>
      <div className={"flex flex-col w-1/2 gap-2 md:w-2/5"}>
        <div className={"flex h-1/4 gap-2 md:h-1/2 md:gap-8"}>
          <MasterlessCurrency
            title={"Блуждающий звёздный блеск"}
            path={"masterless-starglitter"}
          />
          <MasterlessCurrency
            title={"Блуждающая звёздная пыль"}
            path={"masterless-stardust"}
          />
        </div>
        <div
          className={
            "h-4/5 flex flex-col gap-2 md:flex-row md:items-end md:gap-4 md:h-1/2"
          }
        >
          <FooterButton title={"Магазин"} />
          <FooterButton title={"Детали"} />
          <FooterButton title={"История"} />
        </div>
      </div>
      <div
        className={
          "flex flex-col w-1/2 items-end justify-end gap-3 md:flex-row"
        }
      >
        <WishButton count={1} />
        <WishButton count={10} />
      </div>
    </footer>
  );
};
export default Footer;
