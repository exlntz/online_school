import { Timer, Zap } from 'lucide-react';
import type { JSX } from 'react';
import { Button, Card } from '../../../../shared/ui';
import styles from './PracticeActionCard.module.css';
import type { PracticeActionCardProps } from './PracticeActionCard.props';


export const PracticeActionCard = ({ topicsCount, time=10, onStart, className, ...props }: PracticeActionCardProps): JSX.Element => {
    return (
        <Card variant='glass' className={className} {...props}>
            <div className={styles.actionCard}>
                <div className={styles.actionInfo}>
                    <div className={styles.metaGroup}>
                        <span className={styles.metaItem}>
                            <Zap size={16} className={styles.metaIcon} />
                            {topicsCount} тем выбрано
                        </span>
                        <span className={styles.metaItem}>
                            <Timer size={16} className={styles.metaIcon} />
                            {time ? (
                                <span>{time} мин.</span>
                            ) : (
                                <span>Без ограничения по времени</span>
                            )}
                        </span>
                    </div>
                    <h2 className={styles.actionTitle}>Готовы к серии задач?</h2>
                    <p className={styles.actionDesc}>
                        Задачи будут появляться одна за другой. Решайте в своём темпе — прогресс
                        сохраняется автоматически.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="primary"
                    disabled={topicsCount === 0}
                    className={styles.startBtn}
                    size="l"
                    onClick={onStart}
                    radius={20}
                    disableJump
                >
                    <Zap size={20} />
                    Начать нарешку
                </Button>
            </div>
        </Card>
    );
};