'use client';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PromocodesSchema } from '@/lib/form-shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Promocode } from '@/lib/types';
import { deletePromocode, editPromocode } from '@/actions/promocodes';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const PromocodeForm = ({ promocode }: { promocode?: Promocode }) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof PromocodesSchema>>({
        resolver: zodResolver(PromocodesSchema),
        defaultValues: {
            id: promocode?.id ?? null,
            value: promocode?.value ?? '',
            rewards: promocode?.rewards ?? '',
            date: promocode?.startDate ?? new Date(),
        },
    });

    const onSubmit = () => {
        startTransition(async () => {
            const result = await editPromocode(form.getValues());

            toast.success(result.success);
        });
    };

    const deletePromocodeCallback = async (id: number) => {
        const result = await deletePromocode(id);

        toast.success(result.success);
    };

    return (
        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>{promocode ? 'Редактировать прокомод' : 'Добавить промокод'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4 space-x-2'}>
                    <div className={'space-y-2'}>
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Значение</FormLabel>
                                    <FormControl>
                                        <Input placeholder="XXXXXXXXXXXX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rewards"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Награды</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Награды за активацию промокода"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            placeholder="Дата начала действия промокода"
                                            {...field}
                                            value={
                                                field.value instanceof Date
                                                    ? field.value.toISOString().split('T')[0]
                                                    : field.value
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {promocode && (
                        <Button
                            onClick={() => deletePromocodeCallback(promocode.id)}
                            type="button"
                            variant={'destructive'}
                        >
                            Удалить
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {promocode ? 'Сохарнить изменения' : 'Добавить'}
                    </Button>
                </form>
            </Form>
        </DialogContent>
    );
};

export default PromocodeForm;
