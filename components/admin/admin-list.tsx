'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserCog } from 'lucide-react';
import { ExtendedUser } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { setUserRole } from '@/actions/users';
import { UserRoles } from '@/lib/types';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';

const AdminList = ({ admins }: { admins: ExtendedUser[] | null }) => {
    const [username, setUsername] = useState('');

    const setRole = async (userName: string, role: UserRoles) => {
        const result = await setUserRole(userName, role);
        if (result.status === 'success') {
            toast.success(result.message, { className: 'text-base' });
        } else {
            toast.error(result.message, { className: 'text-base' });
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'text-lg absolute bottom-2 right-2 gap-2 h-min'}>
                    Администраторы сайта <UserCog className={'h-full w-auto'} />
                </Button>
            </DialogTrigger>
            <DialogContent className={'max-w-xl'}>
                <DialogHeader>
                    <DialogTitle className={'flex items-center gap-2'}>
                        <UserCog className={'h-full w-auto'} /> Список администраторов сайта
                    </DialogTitle>
                    <DialogDescription>
                        Вы можете назначить пользователя администратором или разжаловать его
                    </DialogDescription>
                </DialogHeader>
                <div className={'flex gap-2'}>
                    <Input
                        placeholder={'Введите имя пользователя'}
                        value={username}
                        onChange={handleInputChange}
                    />
                    <Button onClick={() => setRole(username, 'Admin')} className={'bg-green-400'}>
                        Назначить
                    </Button>
                </div>
                {admins?.map((admin) => (
                    <div
                        key={admin.name}
                        className={'flex items-center justify-between gap-2 bg-gray-200 rounded-lg p-2'}
                    >
                        <Avatar>
                            <AvatarImage src={admin.image ?? undefined} alt={admin.name as string} />
                            <AvatarFallback>{(admin.name as string)[0]}</AvatarFallback>
                        </Avatar>
                        <p className={'w-72 text-center whitespace-nowrap truncate'}>{admin.name}</p>
                        <Button onClick={() => setRole(admin.name as string, 'User')} variant={'destructive'}>
                            Разжаловать
                        </Button>
                    </div>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default AdminList;
