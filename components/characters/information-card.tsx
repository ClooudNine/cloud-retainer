import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const InformationCard = ({
    cardClasses,
    title,
    icon,
    contentClasses,
    content,
    footerContent,
}: {
    cardClasses: string;
    title: string;
    icon: React.ReactNode;
    contentClasses: string;
    content: React.ReactNode;
    footerContent?: string;
}) => {
    return (
        <Card className={'h-fit ' + cardClasses}>
            <CardHeader className={'py-2 items-center'}>
                <CardTitle className={'flex items-center gap-2 text-3xl xl:text-xl'}>
                    {icon}
                    {title}
                    {icon}
                </CardTitle>
            </CardHeader>
            <CardContent className={'pb-2 ' + contentClasses}>{content}</CardContent>
            {footerContent && (
                <CardFooter className={'pb-2 text-destructive justify-center text-center max-xl:text-2xl'}>
                    {footerContent}
                </CardFooter>
            )}
        </Card>
    );
};

export default InformationCard;
