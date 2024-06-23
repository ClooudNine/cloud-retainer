import { elementToColor } from '@/lib/constants';
import { CSSProperties } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Elements } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { elementsEnum } from '@/lib/db/schema';

const ElementPicker = ({
    activeElement,
    setActiveElement,
}: {
    activeElement: Elements | null;
    setActiveElement: (element: Elements | null) => void;
}) => {
    const t = useTranslations('main');

    return (
        <div
            style={
                {
                    '--text-color': `${activeElement ? elementToColor[activeElement] : '0,0,0'}`,
                } as CSSProperties
            }
            className={'space-y-2'}
        >
            <p className={'transition-colors text-[rgb(var(--text-color))]'}>{t('element')}:</p>
            <div className={'flex gap-1.5'}>
                {elementsEnum.enumValues.map((currentElement) => {
                    const elementClasses = clsx(
                        'size-20 rounded-xl transition hover:saturate-200 hover:drop-shadow-[0_1px_10px_rgb(var(--element-color))] xs:size-14',
                        {
                            'ring-2 ring-[rgb(var(--element-color))]': activeElement === currentElement,
                        }
                    );

                    return (
                        <Image
                            key={currentElement}
                            onClick={() =>
                                setActiveElement(currentElement === activeElement ? null : currentElement)
                            }
                            src={`common/elements/${currentElement}.svg`}
                            alt={currentElement}
                            width={70}
                            height={70}
                            style={
                                {
                                    '--element-color': elementToColor[currentElement],
                                } as CSSProperties
                            }
                            className={elementClasses}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ElementPicker;
