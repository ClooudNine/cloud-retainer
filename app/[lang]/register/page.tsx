import Image from 'next/image';
import Logo from '@/components/main/logo';
import RegisterForm from '@/components/auth/register-form';

export default function Register() {
    return (
        <main className={'w-full h-full flex justify-center items-center'}>
            <Logo styles={'absolute top-12 left-12'} />
            <Image
                src={'common/xianyun-main.webp'}
                alt={'Xianyun'}
                fill
                className={'-z-10 object-contain object-right-bottom'}
            />
            <RegisterForm />
        </main>
    );
}
