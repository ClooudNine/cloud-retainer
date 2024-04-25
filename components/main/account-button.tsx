import { CircleUserRound } from 'lucide-react';
import { User } from 'next-auth';

const AccountButton = ({ user }: { user: User }) => {
    return (
        <div className={'w-4/5 flex items-center gap-1 p-1 bg-teal-300 rounded-lg'}>
            <CircleUserRound className={'size-8'} />
            <p className={'truncate w-4/5'}>{user.name}</p>
        </div>
    );
};

export default AccountButton;
