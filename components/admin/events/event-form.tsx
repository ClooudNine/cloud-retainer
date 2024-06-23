'use client';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import CustomFileInput from '@/components/ui/custom-file-input';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EventsSchema } from '@/lib/form-shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { GameEvent } from '@/lib/types';
import { toast } from 'sonner';
import { deleteEvent, editEvent } from '@/actions/events';

const EventForm = ({ event }: { event?: GameEvent }) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof EventsSchema>>({
        resolver: zodResolver(EventsSchema),
        defaultValues: {
            id: event?.id ?? null,
            title: event?.title ?? '',
            description: event?.description ?? '',
            startDate: event?.startDate ?? new Date(),
            endDate: event?.endDate ?? new Date(),
        },
    });

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };

    const onSubmit = () => {
        startTransition(async () => {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('image', selectedFile);
            }
            const result = await editEvent(form.getValues(), formData);

            toast.success(result.success);
        });
    };

    const deleteEventCallback = async (id: number) => {
        const result = await deleteEvent(id);
        toast.success(result.success);
    };

    return (
        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>{event ? 'Редактировать событие' : 'Добавить событие'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4 space-x-2'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'w-[70%] space-y-2'}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Название события" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Описание</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Описание события" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата начала</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="Дата начала"
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
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Дата окончания</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                placeholder="Дата окончания"
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
                        <CustomFileInput
                            onFileSelect={handleFileSelect}
                            initialImage={event && `common/events/${event.title}.webp`}
                        />
                    </div>
                    {event && (
                        <Button
                            onClick={() => deleteEventCallback(event.id)}
                            type="button"
                            variant={'destructive'}
                        >
                            Удалить
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {event ? 'Сохранить изменения' : 'Добавить'}
                    </Button>
                </form>
            </Form>
        </DialogContent>
    );
};

export default EventForm;
