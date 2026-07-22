import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { AsYouType } from 'libphonenumber-js';
import { useEffect, useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { sendAuthCode, verifyAuthCode } from '../../../api/auth';
import type { AuthValues } from '../../../types/auth';
import { cn } from '../../../utils/cn';
import { codeSchema, loginSchema, registerSchema, type CodeFormInputs } from '../../../utils/validations';
import { Input, Radio } from '../../ui';
import styles from './AuthForm.module.css';
import type { AuthFormProps } from "./AuthForm.props";



export const AuthForm = ({ mode, className, ...props }: AuthFormProps): JSX.Element => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const isRegister = mode === 'register';
    const schema = isRegister ? registerSchema : loginSchema;

    const [step, setStep] = useState<'phone' | 'code'>('phone');
    const [savedFirstName, setSavedFirstName] = useState('');
    const [savedPhoneNumber, setSavedPhoneNumber] = useState('');
    const [savedRole, setSavedRole] = useState<'student' | 'parent'>('student');
    const [countdown, setCountdown] = useState(0);

    const phoneForm = useForm<AuthValues>({ resolver: zodResolver(schema) });
    const codeForm = useForm<{ code: string }>({ resolver: zodResolver(codeSchema) });

    const { onChange: onPhoneChange, ...restPhoneRegister } = phoneForm.register('phoneNumber');

    useEffect(() => {
        let timerId: ReturnType<typeof setInterval>;
        if (step === 'code' && countdown > 0) {
            timerId = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [step, countdown]);

    const sendMutation = useMutation({
        mutationFn: (data: AuthValues) => sendAuthCode(data, mode),
        onSuccess: (_, variables) => {
            const cleanPhone = variables.phoneNumber.replace(/[^\d+]/g, '');
            setSavedPhoneNumber(cleanPhone);
            if (isRegister && variables.firstName) {
                setSavedFirstName(variables.firstName);
                if (variables.role) setSavedRole(variables.role); 
            }
            
            setStep('code');
            setCountdown(60);
        }, 
        onError: (error: unknown) => {
            let serverErrorMessage = 'Ошибка при отправке кода';

            if (isAxiosError(error)) {
                serverErrorMessage = error.response?.data?.detail || serverErrorMessage;
            } else if (error instanceof Error) {
                serverErrorMessage = error.message;
            }
            phoneForm.setError('phoneNumber', { message: serverErrorMessage });
        }
    });

    const verifyMutation = useMutation({
        mutationFn: (data: CodeFormInputs) => verifyAuthCode({
            ...(isRegister && { firstName: savedFirstName, role: savedRole }),
            phoneNumber: savedPhoneNumber,
            code: data.code
        }, mode),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            navigate('/profile');
        },
        onError: (error: unknown) => {
            let serverErrorMessage = 'Неверный код';

            if (isAxiosError(error)) {
                serverErrorMessage = error.response?.data?.message || 'Неверный код';
            } else if (error instanceof Error) {
                serverErrorMessage = error.message;
            }

            codeForm.setError('code', { message: serverErrorMessage });
        }
    });

    return (
        <div className={cn(styles.container, className)} {...props}>
            {step === 'phone' ? (
                <div className={styles.form}>
                    <form 
                        onSubmit={phoneForm.handleSubmit((data) => {
                            const cleanPhone = data.phoneNumber.replace(/[^\d+]/g, '');
                            sendMutation.mutate({ ...data, phoneNumber: cleanPhone });
                        })} 
                    >
                        <h1 className={styles.title}>
                            {isRegister ? 'Регистрация' : 'Вход в аккаунт'}
                        </h1>
                        
                        <div className={styles.inputs}>
                            {/* Поле имени рендерим ТОЛЬКО при регистрации */}
                            {isRegister && (
                                <Input 
                                    type="text"
                                    placeholder="Ваше имя"
                                    className={styles.nameInput}
                                    {...phoneForm.register('firstName')} 
                                    error={phoneForm.formState.errors.firstName}
                                />
                            )}

                            <Input 
                                type="tel"
                                placeholder="Номер телефона"
                                className={styles.telephoneInput} 
                                {...restPhoneRegister}
                                onChange={(e) => {
                                    let val = e.target.value;
        
                                    if (val && !val.startsWith('+7')) {
                                        const digits = val.replace(/\D/g, '').replace(/^(7|8)/, '');
                                        val = '+7 ' + digits;
                                    }

                                    const formatted = new AsYouType('RU').input(val);
                                    e.target.value = formatted;
                                    onPhoneChange(e);
                                }}
                                error={phoneForm.formState.errors.phoneNumber}
                            />

                            {isRegister && (
                                <div className={styles.radioGroupWrapper}>
                                    <div className={styles.roleGroup}>
                                        <Radio value="student" {...phoneForm.register('role')}>
                                            Я ученик
                                        </Radio>

                                        <Radio value="parent" {...phoneForm.register('role')}>
                                            Я родитель
                                        </Radio>
                                    </div>

                                    {phoneForm.formState.errors.role && (
                                        <span role='alert' className={styles.errorMessage}>
                                            {phoneForm.formState.errors.role.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <button type="submit" className={styles.submitBtn} disabled={sendMutation.isPending}>
                            {sendMutation.isPending ? 'Загрузка...' : (isRegister ? 'Получить код' : 'Войти')}
                        </button>
                    </form>

                    {/* Динамические ссылки внизу */}
                    <div className={styles.registerPrompt}>
                        {isRegister ? (
                            <>
                                Уже есть аккаунт?
                                <Link to="/login" className={styles.registerLink}>Войти</Link>
                            </>
                        ) : (
                            <>
                                Нет аккаунта?
                                <Link to="/register" className={styles.registerLink}>Зарегистрируйтесь</Link>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.form}>
                    <form onSubmit={codeForm.handleSubmit((data) => verifyMutation.mutate(data))}>
                        <h1 className={styles.title}>Введите код</h1>
                        <p className={styles.subtitle}>Код отправлен на {savedPhoneNumber}</p>
                        
                        <div className={styles.inputs}>
                            <Input 
                                type="text"
                                placeholder="Код из СМС"
                                className={styles.codeInput} 
                                {...codeForm.register('code')}
                                error={codeForm.formState.errors.code}
                            />
                        </div>
                        
                        <button type="submit" className={styles.submitBtn} disabled={verifyMutation.isPending}>
                            {verifyMutation.isPending ? 'Проверка...' : 'Подтвердить'}
                        </button>
                        
                        <div className={styles.actionsWrapper}>
                            {countdown > 0 ? (
                                <span className={styles.timerText}>Запросить повторно через {countdown} сек</span>
                            ) : (
                                <button 
                                    type="button" 
                                    onClick={() => sendMutation.mutate({ 
                                        firstName: savedFirstName, 
                                        phoneNumber: savedPhoneNumber,
                                        role: savedRole
                                    })}
                                    disabled={sendMutation.isPending}
                                    className={styles.resendBtn}
                                >
                                    {sendMutation.isPending ? 'Отправляем...' : 'Отправить код повторно'}
                                </button>
                            )}

                            <button 
                                type="button" 
                                onClick={() => setStep('phone')} 
                                className={styles.changeNumberBtn}
                            >
                                Изменить номер
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
} 