import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { sendAuthCode, verifyAuthCode } from '../../../../features/auth';
import { cn, codeSchema, parseApiError, type CodeFormInputs } from '../../../../shared/lib';
import { Button, Input } from '../../../../shared/ui';
import styles from './CodeStep.module.css';
import type { CodeStepProps } from './CodeStep.props';


export const CodeStep = ( { mode, phoneNumber, firstName, role, onChangeNumber, className, ...props }: CodeStepProps ): JSX.Element => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [countdown, setCountdown] = useState(60);

    const { register, handleSubmit, formState: {errors}, setError } = useForm<CodeFormInputs>({ resolver: zodResolver(codeSchema) });

    useEffect(() => {
        if (countdown <= 0) return;
        const timerId = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [countdown]);

    const verifyMutation = useMutation({
        mutationFn: (data: CodeFormInputs) => verifyAuthCode({
            ...(mode === 'register' && { firstName, role }),
            phoneNumber,
            code: data.code
        }, mode),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            navigate('/profile');
        },
        onError: (error: unknown) => {
            setError('code', { message: parseApiError(error, 'Неверный код') });
        }
    });

    const sendMutation = useMutation({
        mutationFn: () => sendAuthCode({ phoneNumber, firstName, role }, mode),
        onSuccess: () => setCountdown(60),
    });

    return (
        <div className={cn(styles.form, className)} {...props}>
            <form onSubmit={handleSubmit((data) => verifyMutation.mutate(data))}>
                <h1 className={styles.title}>Введите код</h1>
                <p className={styles.subtitle}>Код отправлен на {phoneNumber}</p>

                <div className={styles.inputs}>
                    <Input 
                        type="text"
                        placeholder="Код из СМС"
                        className={styles.codeInput} 
                        {...register('code')}
                        error={errors.code}
                    />
                </div>

                <Button 
                    type="submit" 
                    variant="primary" 
                    size="m" 
                    isLoading={verifyMutation.isPending} 
                    className={styles.submitBtn}
                >
                    Подтвердить
                </Button>

                <div className={styles.actionsWrapper}>
                    {countdown > 0 ? (
                        <span className={styles.timerText}>Запросить повторно через {countdown} сек</span>
                    ) : (
                        <Button
                            type="button"
                            variant="ghost"
                            size="s"
                            noBg
                            onClick={() => sendMutation.mutate()}
                            isLoading={sendMutation.isPending}
                        >
                            Отправить код повторно
                        </Button>
                    )}
                    <Button 
                        type="button" 
                        variant="ghost-secondary" 
                        size="xs" 
                        noBg
                        onClick={onChangeNumber}
                        className={styles.changeNumberBtn}
                    >
                        Изменить номер
                    </Button>
                </div>
            </form>
        </div>
    )
}