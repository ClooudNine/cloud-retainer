import BackButton from '@/components/main/back-button';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { getAllAchievements } from '@/data/achievements';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function Achievements() {
    const allAchievements = await getAllAchievements();

    return (
        <section className={'flex-1 flex flex-col gap-4 px-4 pt-10 max-xs:h-3/4 xs:pt-4'}>
            <div className={'relative flex items-center gap-4'}>
                <BackButton className={''} />
                <Trophy className={'h-full w-auto'} />
                <h1 className={'-ml-2.5 text-3xl'}>Достижения</h1>
                <Image
                    src={'common/kamisato-ayaka-namecard.webp'}
                    alt={'Kamisato Ayaka namecard'}
                    fill
                    className={'-z-10 object-contain object-right'}
                />
            </div>
            <p>
                Всего достижений выполнено:{' '}
                {allAchievements.reduce((sum, chapter) => sum + chapter.achievements.length, 0)}
            </p>
            <section className={'flex-1 flex overflow-hidden'}>
                <section className={'w-[30%] p-2 space-y-4 bg-blue-100 rounded-xl'}>
                    <p>Всего разделов: {allAchievements.length}</p>
                    <Input type={'text'} placeholder={'Поиск по разделам'} className={'text-center'} />
                    <ScrollArea className={'w-full h-full flex flex-col gap-2'}>
                        {allAchievements.map((chapter) => (
                            <div
                                className={'flex justify-between bg-blue-200 rounded-xl'}
                                key={chapter.title}
                            >
                                <Image
                                    src={`common/achievements/${chapter.title.replaceAll(':', '')}.webp`}
                                    alt={chapter.title}
                                    width={60}
                                    height={60}
                                    className={'drop-shadow-2xl'}
                                />
                                <div className={'text-right'}>
                                    {chapter.title}
                                    <p>{chapter.achievements.length}</p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </section>
                <section className={'w-[70%] bg-card shadow overflow-y-auto space-y-4'}></section>
            </section>
        </section>
    );
}
