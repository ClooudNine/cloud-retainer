'use client';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { editCharacterBanner } from '@/actions/banner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useEffect } from 'react';
import { getFeaturedItems, getPreviewUrl } from '@/app/wish-simulator/utils';
import { Character, CharacterBanner, CharacterBannersSchema } from '@/lib/db/schema';
import { getCharacterById } from '@/lib/character';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';
const CharacterBannerForm = ({
    banner,
    characters,
}: {
    banner: CharacterBanner;
    characters: Character[];
}) => {
    const form = useForm<z.infer<typeof CharacterBannersSchema>>({
        resolver: zodResolver(CharacterBannersSchema),
        defaultValues: {
            title: banner.title,
            mainCharacterId: banner.mainCharacterId,
            featuredCharactersId: [],
            version: banner.version,
            phase: banner.phase,
            rerunNumber: banner.rerunNumber,
            image: undefined,
            type: banner.type,
            textParameters: banner.textParameters,
        },
    });

    const editCharacterBannerWithId = editCharacterBanner.bind(null, banner.id);

    useEffect(() => {
        getFeaturedItems(banner.id, banner.type).then((featuredItems) =>
            form.setValue(
                'featuredCharactersId',
                featuredItems.map((featuredItem) => featuredItem.id)
            )
        );
    }, [banner.id, banner.type, form]);

    return (
        <Dialog open>
            <DialogContent className={'sm:max-w-[75vw]'}>
                <Form {...form}>
                    <form action={editCharacterBannerWithId}>
                        <DialogHeader>
                            <DialogTitle>Редактировать баннер персонажа</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-4 h-fit">
                            <div className={'w-2/5'}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Название</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                            <FormControl>
                                                <Input disabled {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mainCharacterId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Главный персонаж</FormLabel>
                                            <Popover modal>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                'w-[200px] justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value
                                                                ? characters.find(
                                                                      (character) =>
                                                                          character.id ===
                                                                          field.value
                                                                  )?.name
                                                                : 'Выбрать персонажа'}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Найти персонажа..." />
                                                        <ScrollArea className={'h-52'}>
                                                            <CommandEmpty>
                                                                Персонажи не найдены
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {characters
                                                                    .filter(
                                                                        (character) =>
                                                                            character.rare ===
                                                                            '5'
                                                                    )
                                                                    .map((character) => (
                                                                        <CommandItem
                                                                            value={
                                                                                character.name
                                                                            }
                                                                            key={
                                                                                character.name
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'mainCharacterId',
                                                                                    character.id
                                                                                );
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    character.id ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0'
                                                                                )}
                                                                            />
                                                                            {
                                                                                character.name
                                                                            }
                                                                            <Image
                                                                                src={`/characters/profiles/${character.name}.webp`}
                                                                                alt={
                                                                                    character.name
                                                                                }
                                                                                width={
                                                                                    100
                                                                                }
                                                                                height={
                                                                                    100
                                                                                }
                                                                                quality={
                                                                                    100
                                                                                }
                                                                                className={
                                                                                    'h-12 w-auto ml-auto'
                                                                                }
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                            </CommandGroup>
                                                        </ScrollArea>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mainCharacterId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Четырёхзвёздочные персонажи
                                            </FormLabel>
                                            <Popover modal>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                'w-[200px] justify-between',
                                                                !field.value &&
                                                                    'text-muted-foreground'
                                                            )}
                                                        >
                                                            {field.value
                                                                ? characters.find(
                                                                      (character) =>
                                                                          character.id ===
                                                                          field.value
                                                                  )?.name
                                                                : 'Выбрать персонажа'}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Найти персонажа..." />
                                                        <ScrollArea className={'h-52'}>
                                                            <CommandEmpty>
                                                                Персонажи не найдены
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {characters
                                                                    .filter(
                                                                        (character) =>
                                                                            character.rare ===
                                                                            '5'
                                                                    )
                                                                    .map((character) => (
                                                                        <CommandItem
                                                                            value={
                                                                                character.name
                                                                            }
                                                                            key={
                                                                                character.name
                                                                            }
                                                                            onSelect={() => {
                                                                                form.setValue(
                                                                                    'mainCharacterId',
                                                                                    character.id
                                                                                );
                                                                            }}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'mr-2 h-4 w-4',
                                                                                    character.id ===
                                                                                        field.value
                                                                                        ? 'opacity-100'
                                                                                        : 'opacity-0'
                                                                                )}
                                                                            />
                                                                            {
                                                                                character.name
                                                                            }
                                                                            <Image
                                                                                src={`/characters/profiles/${character.name}.webp`}
                                                                                alt={
                                                                                    character.name
                                                                                }
                                                                                width={
                                                                                    100
                                                                                }
                                                                                height={
                                                                                    100
                                                                                }
                                                                                quality={
                                                                                    100
                                                                                }
                                                                                className={
                                                                                    'h-12 w-auto ml-auto'
                                                                                }
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                            </CommandGroup>
                                                        </ScrollArea>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phase"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Фаза</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rerunNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Номер повтора</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Настроить смещение имени</Button>
                                    </DialogTrigger>
                                    <DialogContent className={'sm:max-w-[60rem]'}>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Настройка смещения имени
                                            </DialogTitle>
                                            <DialogDescription>
                                                Укажите отступы от правого края и низа в
                                                процентах. Изменения сразу отображаются на
                                                картинке.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div
                                            className={
                                                'mx-auto relative w-fit overflow-hidden'
                                            }
                                        >
                                            <Image
                                                src={`/wish-simulator/banners/${getPreviewUrl(
                                                    banner
                                                )}.webp`}
                                                alt={banner.title}
                                                width={1200}
                                                height={600}
                                                quality={100}
                                                className={'w-[50rem] rounded-xl'}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    right: form.watch('textParameters.r'),
                                                    bottom: form.watch(
                                                        'textParameters.b'
                                                    ),
                                                }}
                                            >
                                                <p
                                                    className={
                                                        'text-3xl text-white drop-shadow-[0_0_2px_rgba(0,0,0,1)]'
                                                    }
                                                >
                                                    {
                                                        getCharacterById(
                                                            form.watch('mainCharacterId'),
                                                            characters
                                                        )?.name
                                                    }
                                                </p>
                                                <p
                                                    className={
                                                        'text-sm mt-7 text-[#c2bd96]'
                                                    }
                                                >
                                                    {
                                                        getCharacterById(
                                                            form.watch('mainCharacterId'),
                                                            characters
                                                        )?.title
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className={'flex'}>
                                            <div>
                                                <Label htmlFor="rightOffset">
                                                    От правого края
                                                </Label>
                                                <Input
                                                    id="rightOffset"
                                                    type={'number'}
                                                    min={0}
                                                    max={100}
                                                    defaultValue={parseFloat(
                                                        form.watch('textParameters.r')
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="bottomOffset">
                                                    От низа
                                                </Label>
                                                <Input
                                                    id="bottomOffset"
                                                    type={'number'}
                                                    min={0}
                                                    max={100}
                                                    defaultValue={parseFloat(
                                                        form.watch('textParameters.b')
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Отмена
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className={'relative w-3/5 rounded-lg overflow-hidden'}>
                                <Image
                                    src={
                                        form.watch('image')
                                            ? URL.createObjectURL(form.watch('image'))
                                            : `/wish-simulator/banners/${getPreviewUrl(
                                                  banner
                                              )}.webp`
                                    }
                                    alt={banner.title}
                                    fill
                                    quality={100}
                                    className={'object-cover'}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Изображение</FormLabel>
                                    <FormControl>
                                        <Input
                                            onChange={(e) => {
                                                // Convert the FileList to an array and update the form state
                                                const filesArray = Array.from(
                                                    e.target.files || []
                                                );
                                                field.onChange(filesArray[0]);
                                            }}
                                            type={'file'}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className={'mt-4'}>
                            <DialogClose>
                                <Button type="button" variant="secondary">
                                    Отмена
                                </Button>
                            </DialogClose>
                            <Button type="submit">Сохранить изменения</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CharacterBannerForm;
