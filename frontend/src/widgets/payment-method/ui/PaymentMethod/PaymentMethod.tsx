import { CreditCard, Pencil } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Button, Card } from '../../../../shared/ui';
import styles from './PaymentMethod.module.css';
import type { PaymentMethodProps } from './PaymentMethod.props';

export const PaymentMethod = ({ className, ...props }: PaymentMethodProps): JSX.Element => {
    return (
        <Card variant="glass" className={cn(className)} {...props}>
            <div className={styles.header}>
                <h2 className={styles.title}>Способ оплаты</h2>
            </div>
            
            <div className={styles.paymentBlock}>
                <div className={styles.cardInfo}>
                    <div className={styles.cardIconWrap}>
                        <CreditCard size={20} strokeWidth={2} />
                    </div>
                    <div className={styles.cardDetails}>
                        <span className={styles.cardNumber}>Visa •••• 4242</span>
                        <span className={styles.cardExpiry}>Действует до 08/27</span>
                    </div>
                </div>
                
                <Button 
                    variant="soft" 
                    size="s" 
                    radius={16}
                    className={styles.actionBtn}
                >
                    <Pencil size={16} />
                    Изменить
                </Button>
            </div>
        </Card>
    );
};