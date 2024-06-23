import { Link } from '@/navigation';

const EntityLink = ({ href, icon, text }: { href: string; icon: React.ReactElement; text: string }) => {
    return (
        <Link
            href={href}
            className="group h-48 w-56 bg-gray-300 text-xl flex flex-col justify-center items-center rounded-xl transition duration-500 hover:bg-black hover:text-white hover:scale-110"
        >
            {icon}
            <p className="drop-shadow-[0_4px_4px_#000000]">{text}</p>
        </Link>
    );
};

export default EntityLink;
