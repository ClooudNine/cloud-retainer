import * as z from 'zod';
import { bannerTypesEnum, phasesEnum } from '@/lib/db/schema';

export const RegisterSchema = z.object({
    email: z.string().email({ message: 'Некорректный ввод Email' }),
    username: z.string().min(2, { message: 'Минимальная длина имени 2 символа' }),
    password: z.string().min(8, { message: 'Минимальная длина пароля 8 символов' }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Некорректный ввод Email' }),
    password: z.string().min(1, { message: 'Поле "Пароль" является обязательным' }),
});

export const CharacterBannersSchema = z.object({
    title: z.string().min(1, { message: 'Название не может быть пустым!' }),
    type: z.enum(bannerTypesEnum.enumValues),
    mainCharacterId: z.number().positive(),
    featuredCharactersId: z.array(z.number().positive()),
    version: z.number().positive(),
    phase: z.enum(phasesEnum.enumValues, {
        errorMap: () => ({ message: 'Ожидается значение 1 или 2!' }),
    }),
    rerunNumber: z.number().int().positive(),
    image: z.instanceof(File).nullish(),
    textParameters: z.object({
        r: z.string(),
        b: z.string(),
    }),
});
