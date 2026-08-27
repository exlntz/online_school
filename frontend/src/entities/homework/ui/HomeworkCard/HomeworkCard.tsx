import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Button, Card } from '../../../../shared/ui';
import styles from './HomeworkCard.module.css';
import type { HomeworkCardProps } from './HomeworkCard.props';

export const HomeworkCard = ({ homework, className, ...props }: HomeworkCardProps): JSX.Element => {
    const isOverdue = homework.status === 'overdue';
    const isDone = homework.status === 'done';

    return (
        <Card variant='glass' className={className} {...props}>
            <div className={styles.card}>
                <div className={styles.info}>
                    <h3 className={styles.title}>{homework.title}</h3>
                    <p className={styles.topic}>{homework.topic}</p>
                    
                    <div className={styles.meta}>
                        <span className={cn(styles.metaItem, {
                            [styles.metaOverdue]: isOverdue,
                            [styles.metaDone]: isDone && !isOverdue 
                        })}>
                            {isOverdue ? (
                                <AlertTriangle size={14} />
                            ) : isDone ? (
                                <CheckCircle2 size={14} />
                            ) : (
                                <Clock size={14} />
                            )}
                            {homework.deadline}
                        </span>
                        <span className={styles.metaItem}>{homework.progress}</span>
                    </div>
                </div>

                {isDone ? (
                    <span className={styles.doneBadge}>
                        <CheckCircle2 size={16} className={styles.metaDone} />
                        Выполнено
                    </span>
                ) : (
                    <Button
                        type="button"
                        variant={isOverdue ? 'danger' : 'primary'}
                        radius={18}
                        size='s'
                        className={cn({ [styles.btnOverdue]: isOverdue })}
                        arrow="right"
                    >
                        {isOverdue ? 'Досдать' : 'Приступить к выполнению'}
                    </Button>
                )}
            </div>
        </Card>
    );
};