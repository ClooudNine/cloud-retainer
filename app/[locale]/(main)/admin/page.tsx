import { unstable_setRequestLocale } from 'next-intl/server';
import BackButton from '@/components/main/back-button';
import {
    CalendarRange,
    Construction,
    Crown,
    Dices,
    Gem,
    Leaf,
    Newspaper,
    Skull,
    Swords,
    Trophy,
} from 'lucide-react';
import Image from 'next/image';
import AdminList from '@/components/admin/admin-list';
import { getAdminUsers } from '@/data/user';
import CharacterIcon from '@/components/icons/character';
import EntityLink from '@/components/admin/entity-link';

export default async function AdminPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);
    const userAdmins = await getAdminUsers();

    const links = [
        { href: '/admin/materials', icon: <Leaf className="size-24" />, text: 'Материалы' },
        { href: '/admin/bosses', icon: <Skull className="size-24" />, text: 'Боссы' },
        { href: '/admin/events', icon: <CalendarRange className="size-24" />, text: 'События' },
        { href: '/admin/achievements', icon: <Trophy className="size-24" />, text: 'Достижения' },
        { href: '/admin/promocodes', icon: <Gem className="size-24" />, text: 'Промокоды' },
        { href: '/admin/banners', icon: <Dices className="size-24" />, text: 'Баннеры' },
        { href: '/admin/characters', icon: <CharacterIcon className="size-24" />, text: 'Персонажи' },
        { href: '/admin/weapons', icon: <Swords className="size-24" />, text: 'Оружие' },
        { href: '/admin/news', icon: <Newspaper className="size-24" />, text: 'Новости' },
        { href: '/admin/artifacts', icon: <Crown className="size-24" />, text: 'Артефакты' },
    ];

    return (
        <section
            className={
                'flex-1 overflow-hidden flex flex-col gap-4 justify-between px-4 pt-10 pb-2 max-xs:h-3/4 xs:pt-4'
            }
        >
            <div className={'relative flex items-center gap-4'}>
                <BackButton className={''} />
                <Construction className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>Админ-панель</h1>
                <Image
                    src={'common/shikanoin-heizou-namecard.webp'}
                    alt={'Shikanoin Heizou Namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <div className={'flex flex-wrap gap-x-2 gap-y-4 justify-between'}>
                {links.map((link, index) => (
                    <EntityLink key={index} {...link} />
                ))}
            </div>
            <AdminList admins={userAdmins} />
        </section>
    );
}
