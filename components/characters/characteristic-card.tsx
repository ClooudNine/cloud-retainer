import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CharacteristicCard = ({
    title,
    icon,
    stat,
    className,
}: {
    title: string | number;
    icon: React.ReactNode;
    stat: string | React.ReactNode;
    className: string;
}) => {
    return (
        <Card className={'w-[32%] flex-1'}>
            <CardHeader className={'p-2 text-center whitespace-nowrap'}>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className={'pb-0 ' + className}>{icon}</CardContent>
            <CardFooter className={'p-2 justify-center'}>{stat}</CardFooter>
        </Card>
    );
};

export default CharacteristicCard;
