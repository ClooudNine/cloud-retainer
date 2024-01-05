import { Fragment } from 'react';
import striptags from 'striptags';
import { Banners } from '@/lib/banners';
import { elementToColor } from '@/lib/common';
import { Character } from '@/lib/db/schema';

const CharacterEventWish = ({
    banner,
    mainCharacter,
    featuredItems,
}: {
    banner: Banners;
    mainCharacter: Character[];
    featuredItems: Character[];
}) => {
    return (
        <>
            <p>
                «Молитва события:{' '}
                <i
                    dangerouslySetInnerHTML={{ __html: striptags(banner.title, '<em>') }}
                ></i>
                » уже доступна! Во время этого события вероятность получения следующих
                персонажей
                <i className={'text-[#c93f23]'}> резко увеличится</i>:{' '}
                <i className={'text-[#c93f23]'}>эксклюзивный</i> персонаж события 5★
                <i
                    className={'text-[rgb(var(--palette))]'}
                >{` «${mainCharacter[0].title}» ${mainCharacter[0].name} (${mainCharacter[0].element})`}</i>
                , а также персонажи 4★{' '}
                {featuredItems.map((character, index) => (
                    <Fragment key={character.name}>
                        <i style={{ color: `rgb(${elementToColor[character.element]})` }}>
                            {`«${character.title}» ${character.name} (${character.element})`}
                        </i>
                        {index === 2 ? '.' : index === 1 ? ' и ' : ', '}
                    </Fragment>
                ))}
            </p>
            <p className={'text-[#c93f23]'}>
                ※ Эксклюзивный персонаж из этого списка не будет доступен в стандартной
                Молитве «Жажда странствий».
            </p>
            <p className={'mt-3 md:mt-6'}>
                ※ При обычных условиях базовая вероятность получения всех персонажей и
                оружия распределяется равномерно. Если действуют какие-либо усиления или
                гарантии, пожалуйста, прочтите соответствующие правила.
            </p>
            <p className={'mt-3 md:mt-6'}>〓 Правила 〓</p>
            <p>Предметы 5★</p>
            <p>
                Пока доступна «Молитва события:{' '}
                <i
                    dangerouslySetInnerHTML={{ __html: striptags(banner.title, '<em>') }}
                ></i>
                », базовая вероятность получения персонажа 5★ ={' '}
                <i className={'text-[#c93f23]'}>0,600%</i>, суммарная вероятность (с
                учётом гарантированного приза) ={' '}
                <i className={'text-[#c93f23]'}>1,600%</i>. Гарантировано получение
                персонажа 5★ как минимум один раз за{' '}
                <i className={'text-[#c93f23]'}>90</i> попыток.
            </p>
            <p>
                Первым полученным персонажем 5★ с вероятностью{' '}
                <i className={'text-[#c93f23]'}>50,000%</i> окажется эксклюзивный персонаж{' '}
                <i
                    className={'text-[rgb(var(--palette))]'}
                >{` «${mainCharacter[0].title}» ${mainCharacter[0].name} (${mainCharacter[0].element})`}</i>
                . Если первым получен другой персонаж 5★, то следующий персонаж 5★
                <i className={'text-[#c93f23]'}> гарантированно</i> окажется указанным
                эксклюзивным персонажем.
            </p>
            <p>Предметы 4★</p>
            <p>
                Пока доступна «Молитва события:{' '}
                <i
                    dangerouslySetInnerHTML={{ __html: striptags(banner.title, '<em>') }}
                ></i>
                », базовая вероятность получения предмета 4★ ={' '}
                <i className={'text-[#c93f23]'}>5,100%</i>, вероятность получения
                персонажа 4★ = <i className={'text-[#c93f23]'}>2,550%</i>, вероятность
                получения оружия 4★ = <i className={'text-[#c93f23]'}>2,550%</i>,
                суммарная вероятность (с учётом гарантированного приза) получения предмета
                4★ = <i className={'text-[#c93f23]'}>13,000%</i>. Получение предмета 4★ и
                выше гарантировано максимум с <i className={'text-[#c93f23]'}>10</i>{' '}
                попытки, и в этом случае вероятность получения предмета 4★ составляет{' '}
                <i className={'text-[#c93f23]'}>99,400%</i>, а вероятность получения
                предмета 5★ - <i className={'text-[#c93f23]'}>0,600%</i>.
            </p>
            <p>
                Первым полученным персонажем 4★ с вероятностью{' '}
                <i className={'text-[#c93f23]'}>50,000%</i> окажется один из перечисленных
                персонажей:{' '}
                {featuredItems.map((character, index) => (
                    <Fragment key={character.name}>
                        <i style={{ color: `rgb(${elementToColor[character.element]})` }}>
                            {`«${character.title}» ${character.name} (${character.element})`}
                        </i>
                        {index === 2 ? '.' : index === 1 ? ' или ' : ', '}
                    </Fragment>
                ))}{' '}
                Если полученный персонаж 4★ не один из перечисленных, то следующий
                персонаж 4★ <i className={'text-[#c93f23]'}>гарантированно</i> окажется
                им. При получении предмета 4★ Молитвы шанс получить любого персонажа 4★
                события будет равным.
            </p>
            <p className={'mt-3 mb:mt-6'}>
                К каждому оружию 4★, полученному из этой Молитвы, прилагается{' '}
                <i className={'text-[#bd6932]'}>Блуждающий звёздный блеск</i> ×2. К
                каждому оружию 3★ прилагается{' '}
                <i className={'text-[#a256e1]'}>Блуждающая звёздная пыль</i> ×15.
            </p>
            <p className={'mt-3 mb:mt-6'}>〓 Дубликаты 〓</p>
            <p>
                Если у вас есть повторяющиеся персонажи 5★ (открытые в игре, купленные в
                магазине или выигранные в Молитве), то начиная с 2 по 7 они конвертируются
                в соответствующую персонажу <i className={'text-[#a256e1]'}>Удачу</i> ×1 и{' '}
                <i className={'text-[#bd6932]'}>Блуждающий звёздный блеск</i> ×10. За 8 и
                далее персонажа вы сможете получить{' '}
                <i className={'text-[#bd6932]'}>Блуждающий звёздный блеск</i> ×25.
            </p>
            <p>
                Если у вас есть повторяющиеся персонажи 4★ (открытые в игре, купленные в
                магазине или выигранные в Молитве), то начиная с 2 по 7 они конвертируются
                в соответствующую персонажу <i className={'text-[#a256e1]'}>Удачу</i> ×1 и{' '}
                <i className={'text-[#bd6932]'}>Блуждающий звёздный блеск </i>
                ×2. За 8 и далее персонажа вы сможете получить{' '}
                <i className={'text-[#bd6932]'}>Блуждающий звёздный блеск </i>
                ×5.
            </p>
            <p className={'mt-3 md:mt-6 pb-3 md:pb-6'}>
                ※ Это Молитва события персонажей
                {banner.type === 'Character Event Wish' ? '' : 'II'}. Количество
                гарантированных попыток Молитвы события персонажей накапливается совместно
                с Молитвой события персонажей II. Количество гарантированных попыток для
                них подсчитывается отдельно и на число гарантированных попыток других
                Молитв не влияет.
            </p>
        </>
    );
};

export default CharacterEventWish;
