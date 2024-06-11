import { CSSProperties } from 'react';

const Title = ({ title, palette }: { title: string; palette: string }) => {
    return (
        <p
            style={{ '--palette': `rgb(${palette})` } as CSSProperties}
            className={
                'absolute text-[#595252] left-[11%] top-[8%] text-2xl xs:left-[13%] xs:top-[5.5%] [&_em]:text-[var(--palette)] [&_em]:not-italic'
            }
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
};

export default Title;
