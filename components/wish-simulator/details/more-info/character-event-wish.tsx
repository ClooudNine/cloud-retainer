import { Fragment } from 'react';
import striptags from 'striptags';
import { elementToColor } from '@/lib/constants';

import { Banners, Character } from '@/lib/types';
import { useTranslations } from 'next-intl';

const CharacterEventWish = ({
    banner,
    mainCharacter,
    featuredItems,
}: {
    banner: Banners;
    mainCharacter: Character[];
    featuredItems: Character[];
}) => {
    const t = useTranslations();

    return (
        <>
            <p>
                «Молитва события:{' '}
                <i dangerouslySetInnerHTML={{ __html: striptags(banner.title, '<em>') }}></i>» уже доступна!
                Во время этого события вероятность получения следующих персонажей
                <i className={'text-[#c93f23]'}> резко увеличится</i>:{' '}
                <i className={'text-[#c93f23]'}>эксклюзивный</i> персонаж события 5★
                <i
                    className={'text-[rgb(var(--palette))]'}
                >{` «${t(`characters.${mainCharacter[0].name}.title`)}» ${mainCharacter[0].name} (${mainCharacter[0].element})`}</i>
                , а также персонажи 4★{' '}
                {featuredItems.map((character, index) => (
                    <Fragment key={character.name}>
                        <i style={{ color: `rgb(${elementToColor[character.element]})` }}>
                            {`«${t(`characters.${character.name}.title`)}»
                             ${t(`characters.${character.name}.name`)}
                              (${t(`elements.${character.element}`)})`}
                        </i>
                        {index === 2 ? '.' : index === 1 ? ' и ' : ', '}
                    </Fragment>
                ))}
            </p>
            <p className={'text-[#c93f23]'}>
                ※ Эксклюзивный персонаж из этого списка не будет доступен в стандартной Молитве «Жажда
                странствий».
            </p>
            <p className={'mt-3 sm:mt-6'}>
                ※ При обычных условиях базовая вероятность получения всех персонажей и оружия распределяется
                равномерно. Если действуют какие-либо усиления или гарантии, пожалуйста, прочтите
                соответствующие правила.
            </p>
            <p className={'mt-3 sm:mt-6'}>〓 Правила 〓</p>
            <p>Предметы 5★</p>
            <p>
                Пока доступна «Молитва события:{' '}
                <i dangerouslySetInnerHTML={{ __html: striptags(banner.title, '<em>') }}></i>
                », базовая вероятность получения персонажа 5★ = <i className={'text-[#c93f23]'}>0,600%</i>,
                суммарная вероятность (с учётом гарантированного приза) ={' '}
                <i className={'text-[#c93f23]'}>1,600%</i>. Гарантировано получение персонажа 5★ как минимум
                один раз за <i className={'text-[#c93f23]'}>90</i> попыток.
            </p>
            <p>
                Первым полученным персонажем 5★ с вероятностью <i className={'text-[#c93f23]'}>50,000%</i>{' '}
                окажется эксклюзивный персонаж{' '}
                <i
                    className={'text-[rgb(var(--palette))]'}
                >{` «${mainCharacter[0].title}» ${mainCharacter[0].name} (${mainCharacter[0].element})`}</i>
                . Если первым получен другой персонаж 5★, то следующий персонаж 5★
                <i className={'text-[#c93f23]'}> гарантированно</i> окажется указанным эксклюзивным
                персонажем.
            </p>
            <p>Предметы 4★</p>
            <p>
                Пока доступна «Молитва события:{' '}
                <i dangerouslySetInnerHTML={{ __html: striptags(banner.title, '<em>') }}></i>
                », базовая вероятность получения предмета 4★ = <i className={'text-[#c93f23]'}>5,100%</i>,
                вероятность получения персонажа 4★ = <i className={'text-[#c93f23]'}>2,550%</i>, вероятность
                получения оружия 4★ = <i className={'text-[#c93f23]'}>2,550%</i>, суммарная вероятность (с
                учётом гарантированного приза) получения предмета 4★ ={' '}
                <i className={'text-[#c93f23]'}>13,000%</i>. Получение предмета 4★ и выше гарантировано
                максимум с <i className={'text-[#c93f23]'}>10</i> попытки, и в этом случае вероятность
                получения предмета 4★ составляет <i className={'text-[#c93f23]'}>99,400%</i>, а вероятность
                получения предмета 5★ - <i className={'text-[#c93f23]'}>0,600%</i>.
            </p>
            <p>
                {t.rich('wish-simulator.four-star-character-chance', {
                    featuredCharacters: () => <div></div>,
                })}
            </p>
            <p
                className={'mt-3 sm:mt-6'}
                dangerouslySetInnerHTML={{ __html: t.raw('wish-simulator.star-glitter-and-dust') }}
            ></p>
            <p className={'mt-3 mb:mt-6'}>{t('wish-simulator.duplicates')}</p>
            <p dangerouslySetInnerHTML={{ __html: t.raw('wish-simulator.duplicate-five-star') }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw('wish-simulator.duplicate-four-star') }} />
            <p className={'mt-3 pb-3 sm:pb-6 sm:mt-6'}>
                {t('wish-simulator.accumulated-guaranteed-attempts', {
                    bannerType: banner.type === 'Character Event Wish' ? '' : ' II',
                })}
            </p>
        </>
    );
};

export default CharacterEventWish;
