import Links from '@/components/wish-simulator/links';
import WishButton from '@/components/wish-simulator/wish-button';

const Footer = async () => {
    return (
        <div
            className={
                'absolute w-full bottom-4 px-2 flex justify-between items-end gap-3 xs:max-lg:pl-32 xs:px-16'
            }
        >
            <Links />
            <div
                className={
                    'flex justify-end flex-col gap-3 xs:max-lg:flex-wrap xs:flex-row'
                }
            >
                <WishButton count={1} />
                <WishButton count={10} />
            </div>
        </div>
    );
};

export default Footer;
