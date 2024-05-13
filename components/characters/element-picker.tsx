import { elementToColor } from '@/lib/constants';
import { CSSProperties } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Elements } from '@/lib/types';

const ElementPicker = ({
    activeElement,
    setActiveElement,
}: {
    activeElement: Elements | null;
    setActiveElement: (element: Elements | null) => void;
}) => {
    const elements: Elements[] = ['Anemo', 'Cryo', 'Geo', 'Pyro', 'Hydro', 'Electro', 'Dendro'];

    return (
        <div
            style={
                {
                    '--text-color': `${activeElement ? elementToColor[activeElement] : '0,0,0'}`,
                } as CSSProperties
            }
            className={'space-y-1 pr-4 border-black border-b sm:border-r-2 sm:border-b-0'}
        >
            <p className={'transition text-[rgb(var(--text-color))]'}>Элемент:</p>
            <div className={'flex gap-1.5'}>
                {elements.map((currentElement) => {
                    const elementClasses = clsx(
                        'size-20 rounded-xl transition hover:saturate-200 hover:drop-shadow-[0_1px_10px_rgb(var(--element-color))] sm:size-14',
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
