import Title from "@/app/wish-simulator/components/headerComponents/Title";
import BannerList from "@/app/wish-simulator/components/headerComponents/BannerList";
import CurrentBalance from "@/app/wish-simulator/components/headerComponents/CurrentBalance";
import CloseButton from "@/app/wish-simulator/components/headerComponents/CloseButton";
const Header = () => {
  return (
    <header className={"z-10 grid grid-cols-12 grid-rows-2 md:grid-rows-1"}>
      <Title />
      <BannerList />
      <CurrentBalance />
      <CloseButton />
    </header>
  );
};
export default Header;
