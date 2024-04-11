import Logo from '@/components/main-page/logo';
import Link from 'next/link';
import WishStarsIcon from '@/components/icons/wish-stars';
import CharacterIcon from '@/components/icons/character';
import { signOut } from '@/auth';
import { currentUser } from '@/lib/auth';
import WeaponIcon from '@/components/icons/weapon';
import HelpDialog from '@/components/main-page/help-dialog';
import {
    AvatarIcon,
    EnterIcon,
    ExitIcon,
    MixerHorizontalIcon,
    PersonIcon,
    PlusIcon,
} from '@radix-ui/react-icons';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();

    return (
        <main className={'h-full flex bg-gray-100'}>
            <aside
                className={
                    'flex justify-between items-center flex-col px-4 py-8 w-64 bg-gray-200 rounded-r-2xl drop-shadow-2xl'
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
                            <MixerHorizontalIcon className={'size-6'} />
                            Админ-панель
                        </Link>
                    )}
                </div>
                <div className={'w-full flex flex-col gap-2'}>
                    {user ? (
                        <div className={'grow-0 flex gap-2'}>
                            <div
                                className={
                                    'w-4/5 flex items-center gap-1 p-1 bg-teal-300 overflow-hidden rounded-lg'
                                }
                            >
                                <AvatarIcon className={'h-4/5 w-1/5'} />
                                <p className={'truncate w-4/5'}>{user.name}</p>
                            </div>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut();
                                }}
                                className={
                                    'w-1/5 bg-red-300 rounded-lg px-2 transition hover:bg-red-400 hover:scale-105'
                                }
                            >
                                <button className={'size-full'} type={'submit'}>
                                    <ExitIcon className={'size-full'} />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <Link
                                className={
                                    'flex items-center px-6 py-1 gap-4 bg-teal-300 rounded-lg transition hover:scale-105 hover:bg-teal-200'
                                }
                                href={'/register'}
                            >
                                <div className={'flex w-1/5'}>
                                    <PersonIcon className={'size-6'} />
                                    <PlusIcon className={'size-4 -ml-1.5 -mt-0.5'} />
                                </div>
                                Регистрация
                            </Link>
                            <Link
                                className={
                                    'flex items-center px-6 py-1 gap-4 bg-teal-300 rounded-lg transition hover:scale-105 hover:bg-teal-200'
                                }
                                href={'/login'}
                            >
                                <EnterIcon className={'w-1/5 size-6'} />
                                Войти
                            </Link>
                        </>
                    )}
                    <HelpDialog />
                </div>
            </aside>
            {children}
        </main>
    );
}
