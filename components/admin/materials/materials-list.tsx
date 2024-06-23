import { Material } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import MaterialButton from '@/components/admin/materials/material-button';
import { storagePaths } from '@/lib/constants';

const MaterialsList = ({ materials }: { materials: Material[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {materials.map((material) => (
                    <MaterialButton
                        key={material.name}
                        material={material}
                        path={storagePaths[material.type]}
                    />
                ))}
            </div>
        </ScrollArea>
    );
};

export default MaterialsList;
