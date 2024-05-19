import Logo from '@/components/main/logo';
import CharacterIcon from '@/components/icons/character';
import { currentUser } from '@/lib/auth';
import HelpDialog from '@/components/main/help-dialog';
import { CalendarRange, Construction, LogIn, Sparkles, Swords, Trophy, UserPlus } from 'lucide-react';
import SignOut from '@/components/main/sign-out';
import AccountButton from '@/components/main/account-button';
import AuthLink from '@/components/main/auth-link';
import NavbarLinks from '@/components/main/navbar-links';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser();

    const navbarLinks = [
        {
            title: 'Симулятор молитв',
            link: '/wish-simulator',
            icon: <Sparkles className={'h-full w-auto'} />,
        },
        { title: 'Персонажи', link: '/characters', icon: <CharacterIcon className={'h-full w-auto'} /> },
        { title: 'Оружие', link: '/weapons', icon: <Swords className={'h-full w-auto'} /> },
        { title: 'Достижения', link: '/achievements', icon: <Trophy className={'h-full w-auto'} /> },
        { title: 'События', link: '/events', icon: <CalendarRange className={'h-full w-auto'} /> },
    ];

    if (user?.role === 'Admin') {
        navbarLinks.push({
            title: 'Админ-панель',
            link: '/admin',
            icon: <Construction className={'h-full w-auto'} />,
        });
    }

    return (
        <main className={'relative h-full flex max-xs:flex-col'}>
            <aside
                className={
                    'relative flex flex-col justify-between items-center gap-8 px-2 py-3 bg-gray-200 max-xs:rounded-b-[8rem] shadow-[0_10px_35px_#000000] max-xs:text-3xl xs:pt-6 xs:shadow-[5px_0_35px_#000000] xs:w-60 xs:rounded-r-2xl'
                }
            >
                <Logo styles={''} />
                <NavbarLinks links={navbarLinks} />
                <div className={'z-10 w-full bottom-4 flex gap-2 max-xs:px-3 max-xs:fixed xs:flex-col'}>
                    {user ? (
                        <div className={'w-full flex gap-1 max-xs:h-20'}>
                            <AccountButton user={user} />
                            <SignOut />
                        </div>
                    ) : (
                        <>
                            <AuthLink title={'Регистрация'} link={'/register'}>
                                <UserPlus className={'size-12 xs:size-6'} />
                            </AuthLink>
                            <AuthLink title={'Войти'} link={'/login'}>
                                <LogIn className={'size-12 xs:size-6'} />
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
