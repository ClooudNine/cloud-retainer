import { CSSProperties } from 'react';
import striptags from 'striptags';

const Title = ({ title, palette }: { title: string; palette: string }) => {
    return (
        <p
            style={{ '--palette': `rgb(${palette})` } as CSSProperties}
            className={
                'absolute text-[#595252] left-[10%] top-[8%] text-[3cqw] sm:text-[2cqw] sm:top-[5.5%] sm:left-[13%] [&_em]:text-[var(--palette)] [&_em]:not-italic'
            }
            dangerouslySetInnerHTML={{
                __html: `Молитва события: ${striptags(title, '<em>')}`,
            }}
        ></p>
    );
};

export default Title;
