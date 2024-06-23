'use client';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { materialsTypesEnum } from '@/lib/db/schema';
import CustomFileInput from '@/components/ui/custom-file-input';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MaterialsSchema } from '@/lib/form-shemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteMaterial, editMaterial } from '@/actions/materials';
import { Material } from '@/lib/types';
import { toast } from 'sonner';

const MaterialForm = ({ material, path }: { material?: Material; path?: string }) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof MaterialsSchema>>({
        resolver: zodResolver(MaterialsSchema),
        defaultValues: {
            id: material?.id ?? null,
            name: material?.name ?? '',
            type: material?.type ?? 'Ascension Material',
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
            const result = await editMaterial(form.getValues(), formData);

            toast.success(result.success);
        });
    };

    const deleteMaterialCallback = async (id: number) => {
        const result = await deleteMaterial(id);
        toast.success(result.success);
    };

    return (
        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>{material ? 'Редактировать материал' : 'Добавить материал'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4 space-x-2'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'w-[70%] space-y-2'}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Название материала" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Тип</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите тип материала" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {materialsTypesEnum.enumValues.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <CustomFileInput
                            onFileSelect={handleFileSelect}
                            initialImage={material && `common/${path}/${material?.name}.webp`}
                        />
                    </div>
                    {material && (
                        <Button
                            onClick={() => deleteMaterialCallback(material.id)}
                            type="button"
                            variant={'destructive'}
                        >
                            Удалить
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit">
                        {material ? 'Сохранить изменения' : 'Добавить'}
                    </Button>
                </form>
            </Form>
        </DialogContent>
    );
};

export default MaterialForm;
