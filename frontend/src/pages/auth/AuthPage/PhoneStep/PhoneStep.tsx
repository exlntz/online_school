import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AsYouType } from 'libphonenumber-js';
import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { sendAuthCode } from '../../../../api/auth';
import { Button, Input, Radio } from '../../../../components/ui';
import { parseApiError } from '../../../../helpers/error.helpers';
import type { AuthValues } from '../../../../types/auth';
import { cn } from '../../../../utils/cn';
import { loginSchema, registerSchema } from '../../../../utils/validations';
import styles from './PhoneStep.module.css';
import type { PhoneStepProps } from './PhoneStep.props';


export const PhoneStep = ( { mode, onSuccess, className, ...props }: PhoneStepProps ): JSX.Element => {
    const isRegister = mode === 'register';
    const schema = isRegister ? registerSchema : loginSchema;

    const { register, handleSubmit, formState: { errors }, setError} = useForm<AuthValues>({ resolver: zodResolver(schema) });

    const { onChange: onPhoneChange, ...restPhoneRegister } = register('phoneNumber');

    const sendMutation = useMutation({
        mutationFn: (data: AuthValues) => sendAuthCode(data, mode),
        onSuccess: (_, variables) => {
            const cleanPhone = variables.phoneNumber.replace(/[^\d+]/g, '');
            onSuccess({
                phoneNumber: cleanPhone,
                firstName: variables.firstName,
                role: variables.role
            });
        }, 
        onError: (error: unknown) => {
            setError('phoneNumber', { message: parseApiError(error, 'Ошибка при отправке кода') });
        }
    });

    const onSubmit = (data: AuthValues) => {
        const cleanPhone = data.phoneNumber.replace(/[^\d+]/g, '');
        sendMutation.mutate({ ...data, phoneNumber: cleanPhone });
    };

    return (
        <div className={cn(styles.form, className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.title}>
                    {isRegister ? 'Регистрация' : 'Вход в аккаунт'}
                </h1>

                <div className={styles.inputs}>
                    {isRegister && (
                        <Input 
                            type="text"
                            placeholder="Ваше имя"
                            className={styles.nameInput}
                            {...register('firstName')} 
                            error={errors.firstName}
                        />
                    )}

                    <Input 
                        type="tel"
                        placeholder="Номер телефона"
                        className={styles.telephoneInput} 
                        {...restPhoneRegister}
                        onChange={(e) => {
                            let val = e.target.value;
                            if (val && !val.startsWith('+')) {
                                val = (val.startsWith('7') || val.startsWith('8')) ? '+7' + val.substring(1) : '+7' + val;
                            }
                            e.target.value = new AsYouType('RU').input(val);
                            onPhoneChange(e);
                        }}
                        error={errors.phoneNumber}
                    />

                    {isRegister && (
                        <div className={styles.radioGroupWrapper}>
                            <div className={styles.roleGroup}>
                                <Radio value="student" {...register('role')}>Я ученик</Radio>
                                <Radio value="parent" {...register('role')}>Я родитель</Radio>
                            </div>
                            {errors.role && (
                                <span role="alert" className={styles.errorMessage}>
                                    {errors.role.message}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <Button 
                    type="submit" 
                    variant="primary" 
                    size="m" 
                    isLoading={sendMutation.isPending} 
                    className={styles.submitBtn}
                >
                    {isRegister ? 'Получить код' : 'Войти'}
                </Button>
            </form>

            <div className={styles.registerPrompt}>
                {isRegister ? (
                    <>Уже есть аккаунт?<Link to="/login" className={styles.registerLink}>Войти</Link></>
                ) : (
                    <>Нет аккаунта?<Link to="/register" className={styles.registerLink}>Зарегистрируйтесь</Link></>
                )}
            </div>
        </div>
    )
}
