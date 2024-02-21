import Link from 'next/link';
import { auth, signOut } from '@/auth';
import Logo from '@/components/main-page/logo';
import Image from 'next/image';
import xianyun from '@/public/common/Xianyun_Profile.webp';
import WishStarsIcon from '@/components/icons/wish-stars';
import CharacterIcon from '@/components/icons/character';
import RegisterIcon from '@/components/icons/register';
import UserIcon from '@/components/icons/user';
import LogoutIcon from '@/components/icons/logout';

export default async function Main() {
    const session = await auth();
    return (
        <main className={'w-full h-full font-genshin flex'}>
            <aside
                className={
                    'h-full flex justify-between items-center flex-col py-8 w-64 bg-gray-200 rounded-r-2xl drop-shadow-2xl'
                }
            >
                <Logo />
                <div className={'flex flex-col gap-4'}>
                    <Link
                        href={'/wish-simulator'}
                        className={
                            'flex items-center gap-2 rounded-lg p-2 bg-gray-300 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]'
                        }
                    >
                        <WishStarsIcon />
                        Симулятор молитв
                    </Link>
                    <Link
                        href={'/characters'}
                        className={
                            'flex items-center gap-2 rounded-lg p-1 bg-gray-300 transition duration-500 hover:-translate-y-1 hover:drop-shadow-[0_15px_15px_rgba(0,0,0,1)]'
                        }
                    >
                        <CharacterIcon />
                        Персонажи
                    </Link>
                </div>
                {session ? (
                    <div className={'flex gap-2'}>
                        <div
                            className={
                                'flex items-center gap-2 bg-teal-300 px-4 py-2 rounded-lg'
                            }
                        >
                            <UserIcon />
                            {session.user?.name}
                        </div>
                        <form
                            action={async () => {
                                'use server';
                                await signOut();
                            }}
                            className={
                                'bg-red-300 flex items-center justify-center rounded-lg px-2 transition hover:bg-red-400'
                            }
                        >
                            <button>
                                <LogoutIcon />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className={'flex flex-col gap-4'}>
                        <Link
                            className={
                                'flex items-center px-6 py-1 gap-4 bg-teal-300 rounded-lg transition ease-in hover:scale-105 hover:bg-teal-200'
                            }
                            href={'/register'}
                        >
                            <RegisterIcon />
                            Регистрация
                        </Link>
                        <Link
                            className={
                                'flex items-center px-6 py-1 gap-4 bg-teal-300 rounded-lg transition ease-in hover:scale-105 hover:bg-teal-200'
                            }
                            href={'/login'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="40"
                                viewBox="0 -960 960 960"
                                width="40"
                            >
                                <path d="M472-86v-126h276v-536H472v-126h276q53 0 89.5 36.5T874-748v536q0 53-36.5 89.5T748-86H472ZM361-232l-88-89 96-96H86v-126h283l-96-96 88-89 247 248-247 248Z" />
                            </svg>
                            Войти
                        </Link>
                    </div>
                )}
            </aside>
            <section className={'flex-1 rounded-lg'}>
                <Image
                    src={xianyun}
                    alt={'Xianyun'}
                    fill
                    quality={100}
                    className={'-z-10 object-contain object-right-bottom'}
                />
                <h1 className={'text-5xl/loose'}>
                    ТВОЙ ЛУЧШИЙ ПОМОЩНИК В МИРЕ GENSHIN IMPACT
                </h1>
            </section>
        </main>
    );
}
