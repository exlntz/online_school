import { Check } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import styles from './TierCard.module.css';
import type { TierCardProps } from './TierCard.props';


export const TierCard = ({ name, price, features, isActive, className, ...props }: TierCardProps): JSX.Element => {
    return (
        <button
            type="button"
            className={cn(styles.tierCard, {
                [styles.active]: isActive
            }, className)}
            aria-pressed={isActive}
            {...props}
        >
            <div className={styles.tierHeader}>
                <span className={styles.tierName}>{name}</span>
                
                <span className={cn(styles.checkWrap, {
                    [styles.checkWrapActive]: isActive
                })}>
                    <Check size={12} strokeWidth={3} />
                </span>
            </div>
            <span className={styles.tierPrice}>{price}</span>
            <span className={styles.tierFeatures}>{features}</span>
        </button>
    );
};