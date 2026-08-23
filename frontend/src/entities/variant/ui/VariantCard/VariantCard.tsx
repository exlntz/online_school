import { CheckCircle2, Clock, Trophy } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import styles from './VariantCard.module.css';
import type { VariantCardProps } from './VariantCard.props';

export const VariantCard = ({ variant, className, ...props }: VariantCardProps): JSX.Element => {
    const isDone = variant.status === 'done';
    const isInProgress = variant.status === 'in-progress';

    return (
        <div className={cn('glass', styles.card, className)} {...props}>
            <div className={styles.header}>
                <div>
                    <h3 className={styles.title}>{variant.title}</h3>
                    <p className={styles.meta}>{variant.meta}</p>
                </div>
                {variant.rated ? (
                    <span className={styles.badgeRated}>
                        <Trophy size={14} />
                        На рейтинг
                    </span>
                ) : (
                    <span className={styles.badgeNormal}>
                        Обычный
                    </span>
                )}
            </div>

            <div className={styles.footer}>
                <span className={cn(styles.status, isDone && styles.statusDone)}>
                    {isDone ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {variant.score ? `${variant.score} · ${variant.deadline}` : variant.deadline}
                </span>

                <Button
                    type="button"
                    variant={isDone ? 'outline' : 'primary'}
                    size="xs"
                    arrow="right"
                    radius={16}
                    disableJump
                >
                    {isDone ? 'Разбор' : isInProgress ? 'Продолжить' : 'Начать вариант'}
                </Button>
            </div>
        </div>
    );
};