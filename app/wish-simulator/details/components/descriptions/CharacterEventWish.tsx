import { CSSProperties } from "react";
import striptags from "striptags";
import { Banners } from "@/app/types/banner";
import { Character } from "@/app/types/character";
import { Weapon } from "@/app/types/weapon";
import { elementToColor } from "@/app/types/common";

const CharacterEventWish = ({
  banner,
  mainItems,
  featuredItems,
  palette,
}: {
  banner: Banners;
  mainItems: Character[] | Weapon[] | null;
  featuredItems: Character[] | Weapon[] | null;
  palette: string;
}) => {
  const character = mainItems![0] as Character;
  return (
    <div
      style={{ "--palette": palette } as CSSProperties}
      className={
        "mt-4 text-[#595252] text-[1.2vw] [&_em]:text-[rgb(var(--palette))] [&_em]:not-italic [&_i]:not-italic"
      }
    >
      <p>
        «Молитва события:{" "}
        <i
          dangerouslySetInnerHTML={{ __html: striptags(banner.title, "<em>") }}
        ></i>
        » уже доступна! Во время этого события вероятность получения следующих
        персонажей
        <i className={"text-[#c93f23]"}> резко увеличится</i>:{" "}
        <i className={"text-[#c93f23]"}>эксклюзивный</i> персонаж события 5★
        <i
          className={"text-[rgb(var(--palette))]"}
        >{` «${character.title}» ${character.name} (${character.element})`}</i>
        , а также персонажи 4★{" "}
        {(featuredItems as Character[]).map((character, index) => (
          <>
            <i
              key={character.name}
              style={{ color: `rgb(${elementToColor[character.element]})` }}
            >
              {`«${character.title}» ${character.name} (${character.element})`}
            </i>
            {index === 2 ? "." : index === 1 ? " и " : ", "}
          </>
        ))}
      </p>
      <p className={"text-[#c93f23]"}>
        ※ Эксклюзивный персонаж из этого списка не будет доступен в стандартной
        Молитве «Жажда странствий».
      </p>
      <p className={"mt-7"}>
        ※ При обычных условиях базовая вероятность получения всех персонажей и
        оружия распределяется равномерно. Если действуют какие-либо усиления или
        гарантии, пожалуйста, прочтите соответствующие правила.
      </p>
      <p className={"mt-7"}>〓 Правила 〓</p>
      <p>Предметы 5★</p>
      <p>
        Пока доступна «Молитва события:{" "}
        <i
          dangerouslySetInnerHTML={{ __html: striptags(banner.title, "<em>") }}
        ></i>
        », базовая вероятность получения персонажа 5★ ={" "}
        <i className={"text-[#c93f23]"}>0,600%</i>, суммарная вероятность (с
        учётом гарантированного приза) ={" "}
        <i className={"text-[#c93f23]"}>1,600%</i>. Гарантировано получение
        персонажа 5★ как минимум один раз за{" "}
        <i className={"text-[#c93f23]"}>90</i> попыток.
      </p>
      <p>
        Первым полученным персонажем 5★ с вероятностью{" "}
        <i className={"text-[#c93f23]"}>50,000%</i> окажется эксклюзивный
        персонаж{" "}
        <i
          className={"text-[rgb(var(--palette))]"}
        >{` «${character.title}» ${character.name} (${character.element})`}</i>
        . Если первым получен другой персонаж 5★, то следующий персонаж 5★
        <i className={"text-[#c93f23]"}> гарантированно</i> окажется указанным
        эксклюзивным персонажем.
      </p>
      <p>Предметы 4★</p>
      <p>
        Пока доступна «Молитва события:{" "}
        <i
          dangerouslySetInnerHTML={{ __html: striptags(banner.title, "<em>") }}
        ></i>
        », базовая вероятность получения предмета 4★ ={" "}
        <i className={"text-[#c93f23]"}>5,100%</i>, вероятность получения
        персонажа 4★ = <i className={"text-[#c93f23]"}>2,550%</i>, вероятность
        получения оружия 4★ = <i className={"text-[#c93f23]"}>2,550%</i>,
        суммарная вероятность (с учётом гарантированного приза) получения
        предмета 4★ = <i className={"text-[#c93f23]"}>13,000%</i>. Получение
        предмета 4★ и выше гарантировано максимум с{" "}
        <i className={"text-[#c93f23]"}>10</i> попытки, и в этом случае
        вероятность получения предмета 4★ составляет{" "}
        <i className={"text-[#c93f23]"}>99,400%</i>, а вероятность получения
        предмета 5★ - <i className={"text-[#c93f23]"}>0,600%</i>.
      </p>
      <p>
        Первым полученным персонажем 4★ с вероятностью{" "}
        <i className={"text-[#c93f23]"}>50,000%</i> окажется один из
        перечисленных персонажей:{" "}
        {(featuredItems as Character[]).map((character, index) => (
          <>
            <i
              key={character.name}
              style={{ color: `rgb(${elementToColor[character.element]})` }}
            >
              {`«${character.title}» ${character.name} (${character.element})`}
            </i>
            {index === 2 ? "." : index === 1 ? " или " : ", "}
          </>
        ))}{" "}
        Если полученный персонаж 4★ не один из перечисленных, то следующий
        персонаж 4★ <i className={"text-[#c93f23]"}>гарантированно</i> окажется
        им. При получении предмета 4★ Молитвы шанс получить любого персонажа 4★
        события будет равным.
      </p>
      <p className={"mt-7"}>
        К каждому оружию 4★, полученному из этой Молитвы, прилагается{" "}
        <i className={"text-[#bd6932]"}>Блуждающий звёздный блеск</i> ×2. К
        каждому оружию 3★ прилагается{" "}
        <i className={"text-[#a256e1]"}>Блуждающая звёздная пыль</i> ×15.
      </p>
      <p className={"mt-7"}>〓 Дубликаты 〓</p>
      <p>
        Если у вас есть повторяющиеся персонажи 5★ (открытые в игре, купленные в
        магазине или выигранные в Молитве), то начиная с 2 по 7 они
        конвертируются в соответствующую персонажу{" "}
        <i className={"text-[#a256e1]"}>Удачу</i> ×1 и{" "}
        <i className={"text-[#bd6932]"}>Блуждающий звёздный блеск</i> ×10. За 8
        и далее персонажа вы сможете получить{" "}
        <i className={"text-[#bd6932]"}>Блуждающий звёздный блеск</i> ×25.
      </p>
      <p>
        Если у вас есть повторяющиеся персонажи 4★ (открытые в игре, купленные в
        магазине или выигранные в Молитве), то начиная с 2 по 7 они
        конвертируются в соответствующую персонажу{" "}
        <i className={"text-[#a256e1]"}>Удачу</i> ×1 и{" "}
        <i className={"text-[#bd6932]"}>Блуждающий звёздный блеск </i>
        ×2. За 8 и далее персонажа вы сможете получить{" "}
        <i className={"text-[#bd6932]"}>Блуждающий звёздный блеск </i>
        ×5.
      </p>
      <p className={"mt-7 pb-7"}>
        ※ Это Молитва события персонажей
        {banner.type === "Character Event Wish" ? "" : "II"}. Количество
        гарантированных попыток Молитвы события персонажей накапливается
        совместно с Молитвой события персонажей II. Количество гарантированных
        попыток для них подсчитывается отдельно и на число гарантированных
        попыток других Молитв не влияет.
      </p>
    </div>
  );
};

export default CharacterEventWish;
