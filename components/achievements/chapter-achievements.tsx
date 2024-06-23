'use client';
import { useMemo, useState } from 'react';
import { groupAchievements } from '@/lib/achievements';
import { Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';
import { Switch } from '@/components/ui/switch';
import AchievementGroup from '@/components/achievements/achievement-group';
import { useTranslations } from 'next-intl';

const ChapterAchievements = () => {
    const t = useTranslations();
    const { activeChapter, completed } = useAchievementsContext();
    const [searchAchievement, setSearchAchievement] = useState('');
    const [showCompleted, setShowCompleted] = useState(false);
    const [showHidden, setShowHidden] = useState(false);

    const groupedAchievements = useMemo(
        () => Object.values(groupAchievements(activeChapter.achievements)),
        [activeChapter.achievements]
    );

    const filteredAchievements = useMemo(() => {
        return groupedAchievements
            .filter((group) =>
                group.some((achievement) => {
                    const matchesSearch = t(`achievements.${achievement.id}.title`)
                        .toLowerCase()
                        .includes(searchAchievement.toLowerCase());
                    const matchesCompleted = showCompleted
                        ? completed.some((ca) => ca.achievementId === achievement.id)
                        : true;
                    const matchesHidden = showHidden ? achievement.hidden : true;
                    return matchesSearch && matchesCompleted && matchesHidden;
                })
            )
            .sort(
                (groupA, groupB) =>
                    Number(groupA.every((a) => completed.some((c) => c.achievement.id === a.id))) -
                    Number(groupB.every((a) => completed.some((c) => c.achievement.id === a.id)))
            );
    }, [groupedAchievements, t, searchAchievement, showCompleted, completed, showHidden]);

    return (
        <section
            className={
                'bg-blue-100 rounded-xl shadow flex flex-col gap-4 p-2 max-xl:flex-1 xl:w-[70%] xl:gap-2'
            }
        >
            <h2 className={'flex items-center justify-center gap-3 text-3xl xs:text-2xl'}>
                <Star className={'h-full w-auto'} />
                {t(`achievements-chapter.${activeChapter.title}`)}
                <Star className={'h-full w-auto'} />
            </h2>
            <div className={'flex items-center gap-4 max-xs:flex-col xs:gap-2'}>
                <div className={'w-full flex items-center gap-2'}>
                    <Search className={'h-full w-auto'} />
                    <Input
                        type={'text'}
                        placeholder={t('main.search-achievements')}
                        className={'border-gray-500 text-center max-xs:h-14 max-xs:text-2xl'}
                        value={searchAchievement}
                        onChange={(e) => setSearchAchievement(e.target.value)}
                    />
                </div>
                <div className={'w-full flex items-center justify-evenly max-xs:text-3xl'}>
                    <label className="flex items-center gap-3">
                        <Switch
                            className={'max-xs:scale-125'}
                            checked={showCompleted}
                            onCheckedChange={() => setShowCompleted((prev) => !prev)}
                        />
                        {t('main.completed')}
                    </label>
                    <label className="flex items-center gap-3">
                        <Switch
                            className={'max-xs:scale-125'}
                            checked={showHidden}
                            onCheckedChange={() => setShowHidden((prev) => !prev)}
                        />
                        {t('main.hidden')}
                    </label>
                </div>
            </div>
            <ScrollArea className={'flex-1'}>
                <div className={'space-y-2'}>
                    {filteredAchievements.map((achievementGroup) => (
                        <AchievementGroup key={achievementGroup[0].title} group={achievementGroup} />
                    ))}
                </div>
            </ScrollArea>
        </section>
    );
};

export default ChapterAchievements;
