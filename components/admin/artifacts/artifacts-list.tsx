import { ScrollArea } from '@/components/ui/scroll-area';
import { ArtifactSet } from '@/lib/types';
import ArtifactsButton from '@/components/admin/artifacts/artifacts-button';

const ArtifactsList = ({ artifacts }: { artifacts: ArtifactSet[] }) => {
    return (
        <ScrollArea>
            <div className={'flex flex-wrap gap-2'}>
                {artifacts.map((artifact) => (
                    <ArtifactsButton key={artifact.title} artifact={artifact} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default ArtifactsList;
