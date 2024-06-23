import { clsx } from 'clsx';
import Image from 'next/image';
import { Award } from 'lucide-react';
import { AchievementChapter } from '@/lib/types';
import { useAchievementsContext } from '@/components/achievements/achievements-provider';
import { useTranslations } from 'next-intl';

const AchievementChapterCard = ({ chapter }: { chapter: AchievementChapter }) => {
    const t = useTranslations();
    const { activeChapter, setActiveChapter, completed } = useAchievementsContext();

    const chapterClasses = clsx(
        'flex justify-between items-center rounded-xl px-2 shadow-lg transition hover:shadow-2xl hover:-translate-y-1',
        {
            'bg-emerald-200': activeChapter === chapter,
            'bg-blue-200': activeChapter !== chapter,
        }
    );

    return (
        <div className={chapterClasses} onClick={() => setActiveChapter(chapter)}>
            <Image
                src={`common/achievements/${chapter.title.replaceAll(':', '')}.webp`}
                alt={t(`achievements-chapter.${chapter.title}`)}
                width={60}
                height={60}
                className={'size-32 drop-shadow-[0_1px_1px_#000000] xs:size-16'}
            />
            <div className={'flex flex-col items-end gap-0.5 text-right'}>
                {t(`achievements-chapter.${chapter.title}`)}
                <div className={'flex gap-1'}>
                    {completed.filter((ca) => ca.achievement.chapter === chapter.id).length}/
                    {chapter.achievements.length}
                    <Award className={'size-6'} />
                </div>
                <div className={'flex gap-1'}>
                    {completed.reduce((sum, ca) => {
                        return ca.achievement.chapter === chapter.id ? sum + ca.achievement.reward : sum;
                    }, 0)}
                    /{chapter.achievements.reduce((sum, achievement) => sum + achievement.reward, 0)}
                    <Image
                        alt={'Primogem'}
                        src={'wish-simulator/assets/primogem.webp'}
                        width={24}
                        height={24}
                        className={'size-6 drop-shadow-[0_1px_1px_#000000]'}
                    />
                </div>
            </div>
        </div>
    );
};

export default AchievementChapterCard;
