'use client';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDownCircle, Search } from 'lucide-react';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';
import AchievementChapterCard from '@/components/achievements/achievement-chapter-card';
import { clsx } from 'clsx';

const ChapterList = () => {
    const { achievements } = useAchievementsContext();
    const [searchChapter, setSearchChapter] = useState('');
    const [isHide, setIsHide] = useState(true);

    const filteredChapters = useMemo(() => {
        return achievements.filter((chapter) =>
            chapter.title.toLowerCase().includes(searchChapter.toLowerCase())
        );
    }, [achievements, searchChapter]);

    const chapterListClasses = clsx('space-y-2 transition-all duration-500', {
        'max-h-0': isHide,
        'max-h-[999rem] py-2': !isHide,
    });

    return (
        <section
            className={'p-2 flex flex-col gap-4 bg-blue-100 rounded-xl shadow-2xl max-xs:text-3xl xl:w-[30%]'}
        >
            <p>Всего разделов: {achievements.length}</p>
            <div className={'flex items-center gap-2'}>
                <Search className={'h-full w-auto'} />
                <Input
                    type={'text'}
                    placeholder={'Поиск по разделам'}
                    className={'border-gray-500 text-center max-xs:text-2xl max-xs:h-14'}
                    value={searchChapter}
                    onChange={(e) => setSearchChapter(e.target.value)}
                />
            </div>
            <ChevronDownCircle
                className={`size-16 mx-auto transition ${!isHide && 'rotate-180'} xl:hidden`}
                onClick={() => setIsHide(!isHide)}
            />
            <ScrollArea className={'flex-1'}>
                <div className={chapterListClasses}>
                    {filteredChapters.map((chapter) => (
                        <AchievementChapterCard key={chapter.title} chapter={chapter} />
                    ))}
                </div>
            </ScrollArea>
        </section>
    );
};

export default ChapterList;
