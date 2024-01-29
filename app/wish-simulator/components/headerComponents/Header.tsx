import Title from '@/app/wish-simulator/components/headerComponents/Title';
import BannerList from '@/app/wish-simulator/components/headerComponents/BannerList';
import CurrentBalance from '@/app/wish-simulator/components/headerComponents/CurrentBalance';
import CloseButton from '@/app/wish-simulator/components/headerComponents/CloseButton';

const Header = () => {
    return (
        <header className={'grid grid-cols-12 grid-rows-2 md:grid-rows-1'}>
            <Title />
            <BannerList />
            <CurrentBalance />
            <CloseButton
                handler={undefined}
                styles={
                    'col-start-12 size-8 lg:size-12 place-self-center rounded-full transition-all bg-[#ede6d6] ring-[6px] ring-[rgba(237,230,214,0.5)] cursor-genshin hover:ring-[#fcfdff] hover:ring-4 hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] active:ring-[#7a8ca4] active:ring-4 active:bg-[#c8c4bb]'
                }
            />
        </header>
    );
};
export default Header;
