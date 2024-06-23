import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import MaterialForm from '@/components/admin/materials/material-form';
import { ArtifactSet } from '@/lib/types';
import ArtifactsButton from '@/components/admin/artifacts/artifacts-button';

const ArtifactsList = ({ artifacts }: { artifacts: ArtifactSet[] }) => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Добавить новый набор артефактов</Button>
                </DialogTrigger>
                <MaterialForm />
            </Dialog>
            <ScrollArea>
                <div className={'flex flex-wrap gap-2'}>
                    {artifacts.map((artifact) => (
                        <ArtifactsButton key={artifact.title} artifact={artifact} />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};

export default ArtifactsList;
