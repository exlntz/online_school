import { Crown } from 'lucide-react';
import { useState, type JSX } from 'react';
import { MOCK_TIERS } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Button, Card } from '../../../../shared/ui';
import { TierCard } from '../TierCard/TierCard';
import styles from './SubscriptionTier.module.css';
import type { SubscriptionTierProps } from './SubscriptionTier.props';


export const SubscriptionTier = ({ className, ...props }: SubscriptionTierProps): JSX.Element => {
    const [activeTier, setActiveTier] = useState<string>('pro');

    return (
        <Card variant="glass" className={cn(className)} {...props}>
            <div className={styles.header}>
                <div className={styles.titleWrap}>
                    <Crown size={20} style={{ color: 'var(--primary)' }} />
                    <h2 className={styles.title}>Уровень подписки</h2>
                </div>
                <span className={styles.statusBadge}>Активна до 12 сентября</span>
            </div>

            <div className={styles.grid}>
                {MOCK_TIERS.map((t) => (
                    <TierCard
                        key={t.id}
                        name={t.name}
                        price={t.price}
                        features={t.features}
                        isActive={activeTier === t.id}
                        onClick={() => setActiveTier(t.id)}
                    />
                ))}
            </div>

            <Button size="s" radius={18} className={styles.actionBtn}>
                Изменить уровень подписки
            </Button>
        </Card>
    );
};