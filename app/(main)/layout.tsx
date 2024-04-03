import Logo from '@/components/main-page/logo';
import Link from 'next/link';
import WishStarsIcon from '@/components/icons/wish-stars';
import CharacterIcon from '@/components/icons/character';
import ToolsIcon from '@/components/icons/tools';
import UserIcon from '@/components/icons/user';
import { signOut } from '@/auth';
import LogoutIcon from '@/components/icons/logout';
import RegisterIcon from '@/components/icons/register';
import { currentUser } from '@/lib/auth';
import LoginIcon from '@/components/icons/login';
import WeaponIcon from '@/components/icons/weapon';
import { Button } from '@/components/ui/button';
import HelpIcon from '@/components/icons/help';
import HelpDialog from '@/components/main-page/help-dialog';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();

    return (
        <main className={'h-full flex overflow-hidden bg-gray-100'}>
            <aside
                className={
                    'flex justify-between items-center flex-col py-8 w-64 bg-gray-200 rounded-r-2xl drop-shadow-2xl'
                }
            >
                <Logo />
                <div className={'flex flex-col gap-4'}>
                    <Link
                        href={'/wish-simulator'}
                        className={
                            'flex h-12 items-center gap-2 rounded-lg p-2 bg-gray-300 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]'
                        }
                    >
                        <WishStarsIcon />
                        Симулятор молитв
                    </Link>
                    <Link
                        href={'/characters'}
                        className={
                            'flex h-12 items-center gap-2 rounded-lg p-2 bg-gray-300 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]'
                        }
                    >
                        <CharacterIcon />
                        Персонажи
                    </Link>
                    <Link
                        href={'/weapons'}
                        className={
                            'flex h-12 items-center gap-2 rounded-lg p-2 bg-gray-300 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]'
                        }
                    >
                        <WeaponIcon />
                        Оружие
                    </Link>
                    {user?.role === 'Admin' && (
                        <Link
                            href={'/admin'}
                            className={
                                'flex h-12 items-center gap-2 rounded-lg p-2 bg-gray-300 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]'
                            }
                        >
                            <ToolsIcon />
                            Админ-панель
                        </Link>
                    )}
                </div>
                <div className={'flex flex-col gap-2'}>
                    {user ? (
                        <div className={'flex gap-2'}>
                            <div
                                className={
                                    'flex items-center gap-2 bg-teal-300 px-4 py-2 rounded-lg break-all'
                                }
                            >
                                <UserIcon />
                                {user.name}
                            </div>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut();
                                }}
                                className={
                                    'bg-red-300 flex items-center rounded-lg px-2 transition hover:bg-red-400 hover:scale-105'
                                }
                            >
                                <button className={'w-full h-full'} type={'submit'}>
                                    <LogoutIcon />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className={'flex flex-col gap-3'}>
                            <Link
                                className={
                                    'flex items-center px-6 py-1 gap-4 bg-teal-300 rounded-lg transition hover:scale-105 hover:bg-teal-200'
                                }
                                href={'/register'}
                            >
                                <RegisterIcon />
                                Регистрация
                            </Link>
                            <Link
                                className={
                                    'flex items-center px-6 py-1 gap-4 bg-teal-300 rounded-lg transition hover:scale-105 hover:bg-teal-200'
                                }
                                href={'/login'}
                            >
                                <LoginIcon />
                                Войти
                            </Link>
                        </div>
                    )}
                    <HelpDialog />
                </div>
            </aside>
            {children}
        </main>
    );
}
