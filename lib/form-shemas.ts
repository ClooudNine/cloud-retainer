import * as z from 'zod';
import { bannerTypesEnum, phasesEnum } from '@/lib/db/schema';

export const RegisterSchema = z.object({
    email: z.string().email({ message: 'incorrect-mail' }),
    username: z.string().min(2, { message: 'minimal-name-length' }),
    password: z.string().min(8, { message: 'minimal-password-length' }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: 'incorrect-mail' }),
    password: z.string().min(1, { message: 'password-required' }),
});

export const MaterialsSchema = z.object({
    id: z.number().positive().nullish(),
    name: z.string().min(2, { message: 'Минимальная длина 2 символа' }),
    type: z.string().min(2, { message: 'Минимальная длина 2 символа' }),
});

export const PromocodesSchema = z.object({
    id: z.number().positive().nullish(),
    value: z.string().length(12, { message: 'Поле должно содержать ровно 12 символов' }),
    rewards: z.string().min(8, { message: 'Минимальная длина 8 символов' }),
    date: z.coerce.date(),
});

export const EventsSchema = z.object({
    id: z.number().positive().nullish(),
    title: z.string().min(2, { message: 'Минимальная длина 2 символа' }),
    description: z.string().min(2, { message: 'Минимальная длина 2 символа' }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
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
