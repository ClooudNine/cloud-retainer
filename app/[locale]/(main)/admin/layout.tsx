import { unstable_setRequestLocale } from 'next-intl/server';
import { currentRole } from '@/lib/auth';
import { ShieldX } from 'lucide-react';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default async function MainLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    unstable_setRequestLocale(locale);

    const userRole = await currentRole();

    if (userRole === 'User') {
        return (
            <section className={'space-y-4 text-center m-auto'}>
                <ShieldX className={'mx-auto size-44 xs:size-28'} />
                <h1 className={'text-5xl xs:text-3xl'}>Доступ к данному разделу закрыт</h1>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'default',
                            className: 'max-xs:p-8 max-xs:text-2xl max-xs:rounded-xl',
                        })
                    )}
                    href={'/'}
                >
                    Назад на главную
                </Link>
            </section>
        );
    }

    return children;
}
