import { z } from 'zod';

export const loginSchema = z.object({
    phone: z.string()
        .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Введите корректный номер телефона')
        .refine((val) => {
            const digitsOnly = val.replace(/\D/g, '');
            return digitsOnly.length >= 7 && digitsOnly.length <= 15;
        }, 'Номер должен содержать от 7 до 15 цифр')
})

export const registerSchema = loginSchema.extend({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа')
});

export const codeSchema = z.object({
    code: z.string().length(4, 'Код должен состоять из 4 цифр')
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
export type CodeFormInputs = z.infer<typeof codeSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>