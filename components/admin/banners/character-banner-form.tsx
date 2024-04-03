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
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Character, CharacterBanner, CharacterBannersSchema } from '@/lib/db/schema';
import { getCharacterById } from '@/lib/character';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
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
import { getPreviewUrl } from '@/lib/wish-simulator';
import { currentGamePhase, currentGameVersion } from '@/lib/constants';
import { useToast } from '@/components/ui/use-toast';

const CharacterBannerForm = ({
    banner,
    characters,
    closeEdit,
}: {
    banner: CharacterBanner;
    characters: Character[];
    closeEdit: () => void;
}) => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof CharacterBannersSchema>>({
        resolver: zodResolver(CharacterBannersSchema),
        defaultValues: {
            title: banner.title || '',
            mainCharacterId: banner.mainCharacterId || 1,
            featuredCharactersId:
                banner.featuredCharactersInBanners.map(({ character }) => character.id) ||
                [],
            version: banner.version || currentGameVersion,
            phase: banner.phase || currentGamePhase,
            rerunNumber: banner.rerunNumber || 1,
            type: banner.type || 'Character Event Wish',
            textParameters: banner.textParameters || { r: '0%', b: '0%' },
        },
    });

    async function onSubmit(data: z.infer<typeof CharacterBannersSchema>) {
        const imageData = new FormData();
        const maybeImage = data.image;
        if (maybeImage) {
            imageData.append('image', maybeImage);
            data.image = null;
        }

        const status = await editCharacterBanner(banner.id, data, image);

        toast({
            title: 'Редактирование баннера персонажа',
            description: status.toString(),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                    <DialogTitle>Редактировать баннер персонажа</DialogTitle>
                </DialogHeader>
                <div className="mt-4 flex gap-4">
                    <div className={'w-2/5 space-y-2'}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        &lt;br&gt; - перенос на новую строку <br />
                                        &lt;em&gt; - выделенное слово для подсветки
                                    </FormDescription>
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
                                        <Input
                                            readOnly={Boolean(banner.type)}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mainCharacterId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Главный персонаж</FormLabel>
                                    <Popover modal>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        'w-full justify-between',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value
                                                        ? getCharacterById(
                                                              field.value,
                                                              characters
                                                          )?.name
                                                        : 'Выбрать персонажа'}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Найти персонажа..." />
                                                <ScrollArea className={'h-72'}>
                                                    <CommandEmpty>
                                                        Персонаж не найден
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {characters
                                                            .filter(
                                                                (character) =>
                                                                    character.rare === '5'
                                                            )
                                                            .map((character) => (
                                                                <CommandItem
                                                                    value={character.name}
                                                                    key={character.name}
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
                                                                    {character.name}
                                                                    <Image
                                                                        src={`/characters/profiles/${character.name}.webp`}
                                                                        alt={
                                                                            character.name
                                                                        }
                                                                        width={100}
                                                                        height={100}
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
                            name="featuredCharactersId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Четырёхзвёздочные персонажи</FormLabel>
                                    <Popover modal>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        'w-full justify-between',
                                                        !field.value &&
                                                            'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value
                                                        ? field.value.map(
                                                              (selectedCharacter) => (
                                                                  <p
                                                                      key={
                                                                          selectedCharacter
                                                                      }
                                                                  >
                                                                      {getCharacterById(
                                                                          selectedCharacter,
                                                                          characters
                                                                      )?.name + ', '}
                                                                  </p>
                                                              )
                                                          )
                                                        : 'Выбрать персонажей'}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Найти персонажа..." />
                                                <ScrollArea className={'h-72'}>
                                                    <CommandEmpty>
                                                        Персонажи не найдены
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {characters
                                                            .filter(
                                                                (character) =>
                                                                    character.rare === '4'
                                                            )
                                                            .map((character) => (
                                                                <CommandItem
                                                                    value={character.name}
                                                                    key={character.name}
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            'featuredCharactersId',
                                                                            field.value.includes(
                                                                                character.id
                                                                            )
                                                                                ? field.value.filter(
                                                                                      (
                                                                                          id
                                                                                      ) =>
                                                                                          id !==
                                                                                          character.id
                                                                                  )
                                                                                : [
                                                                                      ...field.value,
                                                                                      character.id,
                                                                                  ]
                                                                        );
                                                                    }}
                                                                >
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            field.value.includes(
                                                                                character.id
                                                                            )
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0'
                                                                        )}
                                                                    />
                                                                    {character.name}
                                                                    <Image
                                                                        src={`/characters/profiles/${character.name}.webp`}
                                                                        alt={
                                                                            character.name
                                                                        }
                                                                        width={100}
                                                                        height={100}
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
                        <div className={'flex gap-3'}>
                            <FormField
                                control={form.control}
                                name="phase"
                                render={({ field }) => (
                                    <FormItem className={'w-52'}>
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
                        </div>
                    </div>
                    <div className={'w-3/5 relative rounded-lg overflow-hidden'}>
                        <Image
                            src={
                                form.watch('image')
                                    ? URL.createObjectURL(form.watch('image') as File)
                                    : `wish-simulator/banners/${getPreviewUrl(
                                          banner
                                      )}.webp`
                            }
                            alt={banner?.title}
                            width={800}
                            height={600}
                            className={'object-cover'}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="file" accept={'image/webp'} />
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
                                    <DialogTitle>Настройка смещения имени</DialogTitle>
                                    <DialogDescription>
                                        Укажите отступы от правого края и низа в
                                        процентах. Изменения сразу отображаются на
                                        картинке.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className={'relative overflow-hidden mx-auto'}>
                                    <Image
                                        src={`/wish-simulator/banners/${getPreviewUrl(
                                            banner
                                        )}.webp`}
                                        alt={banner.title}
                                        width={1200}
                                        height={600}
                                        className={'w-[50rem] rounded-xl'}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            right: form.watch('textParameters.r') + '%',
                                            bottom: form.watch('textParameters.b') + '%',
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
                                        <p className={'text-sm mt-7 text-[#c2bd96]'}>
                                            {
                                                getCharacterById(
                                                    form.watch('mainCharacterId'),
                                                    characters
                                                )?.title
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className={'flex gap-4 mx-auto'}>
                                    <FormField
                                        control={form.control}
                                        name="textParameters.r"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>От правого края</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={'number'}
                                                        min={0}
                                                        max={100}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="textParameters.b"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>От низа</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={'number'}
                                                        min={0}
                                                        max={100}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
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
                </div>
                <DialogFooter>
                    <Button type={'button'} onClick={closeEdit} variant={'secondary'}>
                        Отмена
                    </Button>
                    <Button type="submit">Сохранить изменения</Button>
                </DialogFooter>
            </form>
        </Form>
    );
};

export default CharacterBannerForm;
