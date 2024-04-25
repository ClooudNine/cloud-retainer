import { signOut } from '@/auth';
import { LogOut } from 'lucide-react';

const SignOut = () => {
    return (
        <form
            action={async () => {
                'use server';
                await signOut();
            }}
            className={
                'w-1/5 bg-red-300 p-1 rounded-lg transition hover:bg-red-400 hover:scale-105'
            }
        >
            <button className={'size-full'} type={'submit'}>
                <LogOut className={'size-full'} />
            </button>
        </form>
    );
};

export default SignOut;
