import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AsYouType } from 'libphonenumber-js';
import { useEffect, useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { sendLoginSmsCode, sendSmsCode, verifyLoginSmsCode, verifySmsCode } from '../../../api/auth';
import { cn } from '../../../utils/cn';
import { codeSchema, loginSchema, registerSchema, type CodeFormInputs } from '../../../utils/validations';
import { Input } from "../Input/Input";
import styles from './AuthForm.module.css';
import type { AuthFormProps, AuthValues } from "./AuthForm.props";


export const AuthForm = ({ mode, className, ...props }: AuthFormProps): JSX.Element => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const isRegister = mode === 'register';
    const schema = isRegister ? registerSchema : loginSchema;

    const [step, setStep] = useState<'phone' | 'code'>('phone');
    const [savedName, setSavedName] = useState('');
    const [savedPhone, setSavedPhone] = useState('');
    const [countdown, setCountdown] = useState(0);

    const phoneForm = useForm<AuthValues>({ resolver: zodResolver(schema) });
    const codeForm = useForm<{ code: string }>({ resolver: zodResolver(codeSchema) });

    const { onChange: onPhoneChange, ...restPhoneRegister } = phoneForm.register('phone');

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
        mutationFn: (data: AuthValues) => isRegister ? sendSmsCode(data) : sendLoginSmsCode(data),
        onSuccess: (_, variables) => {
            const cleanPhone = variables.phone.replace(/[^\d+]/g, '');
            setSavedPhone(cleanPhone);
            if (isRegister && variables.name) {
                setSavedName(variables.name); 
            }
            setStep('code');
            setCountdown(60);
        }
    });

    const verifyMutation = useMutation({
        mutationFn: (data: CodeFormInputs) => isRegister 
            ? verifySmsCode({ name: savedName, phone: savedPhone, code: data.code })
            : verifyLoginSmsCode({ phone: savedPhone, code: data.code }),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            navigate('/profile');
        },
        onError: () => {
            codeForm.setError('code', { message: 'Неверный код' });
        }
    });

    return (
        <div className={cn(styles.container, className)} {...props}>
            {step === 'phone' ? (
                <div className={styles.form}>
                    <form 
                        onSubmit={phoneForm.handleSubmit((data) => {
                            const cleanPhone = data.phone.replace(/[^\d+]/g, '');
                            sendMutation.mutate({ ...data, phone: cleanPhone });
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
                                    {...phoneForm.register('name')} 
                                    error={phoneForm.formState.errors.name}
                                />
                            )}

                            <Input 
                                type="tel"
                                placeholder="Номер телефона"
                                className={styles.telephoneInput} 
                                {...restPhoneRegister}
                                onChange={(e) => {
                                    const formatted = new AsYouType('RU').input(e.target.value);
                                    e.target.value = formatted;
                                    onPhoneChange(e);
                                }}
                                error={phoneForm.formState.errors.phone}
                            />
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
                        <p className={styles.subtitle}>Код отправлен на {savedPhone}</p>
                        
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
                                    onClick={() => sendMutation.mutate({ name: savedName, phone: savedPhone })}
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