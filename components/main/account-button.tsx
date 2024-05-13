import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AccountButton = ({ user }: { user: User }) => {
    return (
        <div className={'w-4/5 flex items-center gap-2 p-1 bg-teal-300 rounded-lg'}>
            <Avatar>
                <AvatarImage src={user.image ?? undefined} alt={user.name as string} />
                <AvatarFallback>{(user.name as string)[0]}</AvatarFallback>
            </Avatar>
            <p className={'truncate'}>{user.name}</p>
        </div>
    );
};

export default AccountButton;
