'use client';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useTransition } from 'react';
import CustomFileInput from '@/components/ui/custom-file-input';
import { saveProfileChanges } from '@/actions/users';
import { toast } from 'sonner';

const AccountButton = ({ user }: { user: User }) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState<string>(user.name ?? '');

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const saveChanges = () => {
        startTransition(async () => {
            const formData = new FormData();

            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }
            formData.append('name', name);

            const result = await saveProfileChanges(user.id as string, formData);

            if (result.status === 'success') {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger
                className={
                    'w-4/5 flex items-center gap-2 p-1 bg-teal-300 rounded-lg transition hover:bg-teal-400 hover:scale-105'
                }
            >
                <Avatar>
                    <AvatarImage src={user.image ?? undefined} alt={user.name as string} />
                    <AvatarFallback>{(user.name as string)[0]}</AvatarFallback>
                </Avatar>
                <p className={'truncate'}>{user.name}</p>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Настройки профиля</DialogTitle>
                    <DialogDescription>Для изменения аватара нажмите на него</DialogDescription>
                </DialogHeader>
                <div className={'flex justify-between'}>
                    <CustomFileInput onFileSelect={handleFileSelect} initialImage={user.image} />
                    <div className={'w-3/5 space-y-1'}>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" disabled defaultValue={user.email ?? ''} />
                        </div>
                        <div>
                            <Label htmlFor="name">Имя</Label>
                            <Input id="name" value={name} onChange={handleNameChange} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Назад
                        </Button>
                    </DialogClose>
                    <Button disabled={isPending} onClick={saveChanges}>
                        Сохранить изменения
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AccountButton;
