import Links from '@/app/wish-simulator/components/footerComponents/Links';
import WishButton from '@/app/wish-simulator/components/footerComponents/WishButton';
import SettingsIcon from '@/components/icons/settings';
import { currentRole } from '@/lib/auth';
import EditBannersButton from '@/app/wish-simulator/components/footerComponents/EditBannersButton';

const Footer = async () => {
    const userRole = await currentRole();
    return (
        <div
            className={
                'z-10 absolute w-full bottom-4 px-2 flex justify-between items-end gap-3 xs:max-lg:pl-32 xs:px-16'
            }
        >
            <Links />
            {userRole === 'Admin' && <EditBannersButton />}
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
