import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { Material } from '@/lib/types';
import MaterialForm from '@/components/admin/materials/material-form';

const MaterialButton = ({ material, path }: { material: Material; path: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    key={material.name}
                    className={'size-40 bg-gray-300 rounded-lg flex flex-col items-center text-center'}
                >
                    <Image
                        src={`common/${path}/${material.name}.webp`}
                        alt={material.name}
                        width={100}
                        height={100}
                        className={'h-[80%] object-contain'}
                    />
                    {material.name}
                </div>
            </DialogTrigger>
            <MaterialForm material={material} path={path} />
        </Dialog>
    );
};

export default MaterialButton;
