import { CSSProperties } from 'react';
import striptags from 'striptags';

const Title = ({ title, palette }: { title: string; palette: string }) => {
    return (
        <p
            style={{ '--palette': `rgb(${palette})` } as CSSProperties}
            className={
                'absolute text-[#595252] top-[4%] md:top-[5.5%] left-[13%] text-[3vw] md:text-[1.5vw] [&_em]:text-[var(--palette)] [&_em]:not-italic'
            }
            dangerouslySetInnerHTML={{
                __html: `Молитва события: ${striptags(title, '<em>')}`,
            }}
        ></p>
    );
};

export default Title;
