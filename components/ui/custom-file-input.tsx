import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

interface CustomFileInputProps {
    onFileSelect: (file: File | null) => void;
    initialImage?: string | null;
}

const CustomFileInput = ({ onFileSelect, initialImage }: CustomFileInputProps) => {
    const [imageSrc, setImageSrc] = useState<string | undefined | null>(initialImage);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageSrc(URL.createObjectURL(file));
            onFileSelect(file);
        }
    };

    return (
        <div>
            <input type="file" ref={fileInputRef} className={'hidden'} onChange={handleFileChange} />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="size-28 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl relative overflow-hidden"
            >
                {imageSrc ? (
                    <Image
                        loader={() => imageSrc}
                        src={imageSrc}
                        alt={'Текущее изображение'}
                        width={100}
                        height={100}
                        className={'size-full object-cover rounded-full'}
                    />
                ) : (
                    '+'
                )}
            </button>
        </div>
    );
};

export default CustomFileInput;
