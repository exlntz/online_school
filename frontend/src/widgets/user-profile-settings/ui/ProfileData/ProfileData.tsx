import { LifeBuoy } from 'lucide-react';
import type { JSX } from 'react';
import { useUser } from '../../../../entities/user';
import { cn, formatPhone } from '../../../../shared/lib';
import { Button, Card, Divider, Input } from '../../../../shared/ui';
import styles from './ProfileData.module.css';
import type { ProfileDataProps } from './ProfileData.props';


export const ProfileData = ({ className, ...props }: ProfileDataProps): JSX.Element => {
    const { data: user } = useUser();

    return (
        <Card variant='glass' className={className} {...props}>
            <div className={styles.formGrid}>
                <label className={styles.field}>
                    <span className={styles.label}>Имя пользователя</span>
                    <Input 
                        defaultValue={user?.firstName || ''} 
                        placeholder="Введите имя" 
                        className={styles.input}
                    />
                </label>
                
                <label className={styles.field}>
                    <span className={styles.label}>Телефон</span>
                    <Input 
                        type="tel" 
                        value={formatPhone(user?.phoneNumber)} 
                        readOnly
                        placeholder="+7 (___) ___-__-__" 
                        title="Номер телефона нельзя изменить самостоятельно"
                        className={cn(styles.input, styles.numberInput)}
                    />
                </label>
            </div>
            
            <Divider />

            <div className={styles.actionRow}>
                <Button size="s" radius={18}>Сохранить изменения</Button>
                <Button size="s" variant="ghost-secondary" radius={18}>
                    <LifeBuoy size={18} />
                    Написать в поддержку
                </Button>
            </div>
        </Card>
    );
};