const NoviceWish = () => {
    return (
        <>
            <p>
                <i>
                    <em>Молитва</em> новичка
                </i>
                – это стандартная Молитва. Она не ограничена по времени и создана
                специально для тех, кто в Тейвате совсем недавно. В рамках Молитвы
                доступны не лимитированные персонажи и оружие.
            </p>
            <p>
                В Молитве новичка набор из 10 молитв стоит на{' '}
                <i className={'text-[#c93f23]'}>20%</i> Судьбоносных встреч меньше. Кроме
                этого, за первые 10 Молитв вы{' '}
                <i className={'text-[#c93f23]'}>гарантированно</i> получите{' '}
                <em>«Нераспустившийся цветок» Ноэлль (Гео)</em>, а за следующие 10 –
                <i className={'text-[#c93f23]'}>персонажа</i> 4★ или выше!
            </p>
            <p>
                Действие Молитвы новичка заканчивается после{' '}
                <i className={'text-[#c93f23]'}>20</i> попыток. Когда Молитва новичка
                закончится, страница Молитвы станет недоступна.{' '}
            </p>
            <p className={'mt-3 sm:mt-6'}>
                ※ При обычных условиях базовая вероятность получения всех персонажей и
                оружия распределяется равномерно. Если действуют какие-либо усиления или
                гарантии, пожалуйста, прочтите соответствующие правила.
            </p>
            <p className={'mt-3 sm:mt-6'}>〓 Правила 〓</p>
            <p>
                Базовая вероятность выпадения персонажа 5★ ={' '}
                <i className={'text-[#c93f23]'}>0,600%</i>.
            </p>
            <p>
                Базовая вероятность выпадения персонажа 4★ ={' '}
                <i className={'text-[#c93f23]'}>5,100%</i>, суммарная вероятность (с
                учётом гарантированного приза) ={' '}
                <i className={'text-[#c93f23]'}>13,000%</i>. Гарантированное выпадение
                персонажа 4★ и выше, как минимум, один раз за{' '}
                <i className={'text-[#c93f23]'}>10</i> попыток.
            </p>
            <p>
                К каждому оружию 3★ прилагается{' '}
                <i className={'text-[#a36bcd]'}>Звёздная пыль</i> ×15
            </p>
            <p className={'mt-3 sm:mt-6'}>〓 Дубликаты 〓</p>
            <p>
                Если у вас есть повторяющиеся персонажи 5★ (открытые в игре, купленные в
                магазине или выигранные в Молитве), то начиная с 2 по 7 они конвертируются
                в соответствующую персонажу <i className={'text-[#a256e1]'}>Удачу</i> ×1 и{' '}
                <i className={'text-[#bd6932]'}>Звёздный блеск </i>
                ×10. За 8 и далее персонажа вы сможете получить{' '}
                <i className={'text-[#bd6932]'}>Звёздный блеск</i> ×25.
            </p>
            <p className={'pb-3 sm:pb-6'}>
                Если у вас есть повторяющиеся персонажи 4★ (открытые в игре, купленные в
                магазине или выигранные в Молитве), то начиная с 2 по 7 они конвертируются
                в соответствующую персонажу <i className={'text-[#a256e1]'}>Удачу</i> ×1 и{' '}
                <i className={'text-[#bd6932]'}>Звёздный блеск </i>
                ×2. За 8 и далее персонажа вы сможете получить{' '}
                <i className={'text-[#bd6932]'}>Звёздный блеск </i>
                ×5.
            </p>
            <p className={'mt-3 pb-3 sm:pb-6 sm:mt-6'}>
                ※ Это Молитва новичка. Количество гарантированных попыток для неё
                подсчитывается отдельно и на число гарантированных попыток других молитв
                не влияет.
            </p>
        </>
    );
};

export default NoviceWish;
