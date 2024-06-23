import BackButton from '@/components/main/back-button';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { getAllAchievements, getCompletedAchievements } from '@/data/achievements';
import { currentUser } from '@/lib/auth';
import AchievementsProvider from '@/components/achievements/achievements-provider';
import ChapterList from '@/components/achievements/chapter-list';
import ChapterAchievements from '@/components/achievements/chapter-achievements';
import AchievementsCounter from '@/components/achievements/achievements-counter';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.achievements' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function Achievements({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations();
    const user = await currentUser();
    const allAchievements = await getAllAchievements();
    const userCompletedAchievements = await getCompletedAchievements(user?.id);

    return (
        <AchievementsProvider
            user={user}
            achievements={allAchievements}
            completedAchievements={userCompletedAchievements}
        >
            <section className={'flex-1 flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
                <div className={'relative flex items-center gap-4'}>
                    <BackButton className={''} />
                    <Trophy className={'h-full w-auto'} />
                    <h1 className={'-ml-2.5 text-3xl'}>{t('main.achievements')}</h1>
                    <Image
                        src={'common/kamisato-ayaka-namecard.webp'}
                        alt={'Kamisato Ayaka namecard'}
                        fill
                        className={'-z-10 object-contain object-right'}
                    />
                </div>
                <AchievementsCounter />
                <section className={'h-3/4 flex gap-2 overflow-y-auto max-xl:flex-col xs:flex-1'}>
                    <ChapterList />
                    <ChapterAchievements />
                </section>
            </section>
        </AchievementsProvider>
    );
}
