import Logo from '@/components/main/logo';
import WishStarsIcon from '@/components/icons/wish-stars';
import CharacterIcon from '@/components/icons/character';
import { currentUser } from '@/lib/auth';
import WeaponIcon from '@/components/icons/weapon';
import HelpDialog from '@/components/main/help-dialog';
import { Construction, LogIn, Trophy, UserPlus } from 'lucide-react';
import NavbarLink from '@/components/main/navbar-link';
import SignOut from '@/components/main/sign-out';
import AccountButton from '@/components/main/account-button';
import AuthLink from '@/components/main/auth-link';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();

    const navbarLinks = [
        { title: 'Симулятор молитв', link: '/wish-simulator', icon: <WishStarsIcon /> },
        { title: 'Персонажи', link: '/characters', icon: <CharacterIcon /> },
        { title: 'Оружие', link: '/weapons', icon: <WeaponIcon /> },
        { title: 'Достижения', link: '/achievements', icon: <Trophy className={'size-6'} /> },
    ];

    if (user?.role === 'Admin') {
        navbarLinks.push({
            title: 'Админ-панель',
            link: '/admin',
            icon: <Construction className="size-6" />,
        });
    }

    return (
        <main className={'h-full flex'}>
            <aside
                className={
                    'flex flex-col justify-between items-center px-3 py-6 w-60 bg-gray-200 rounded-r-2xl shadow-2xl'
                }
            >
                <Logo />
                <div className={'w-full flex flex-col gap-4'}>
                    {navbarLinks.map(({ title, link, icon }) => (
                        <NavbarLink key={link} title={title} link={link}>
                            {icon}
                        </NavbarLink>
                    ))}
                </div>
                <div className={'w-full flex flex-col gap-2'}>
                    {user ? (
                        <div className={'flex gap-1'}>
                            <AccountButton user={user} />
                            <SignOut />
                        </div>
                    ) : (
                        <>
                            <AuthLink title={'Регистрация'} link={'/register'}>
                                <UserPlus className={'size-6'} />
                            </AuthLink>
                            <AuthLink title={'Войти'} link={'/login'}>
                                <LogIn className={'size-6'} />
                            </AuthLink>
                        </>
                    )}
                    <HelpDialog />
                </div>
            </aside>
            {children}
        </main>
    );
}
