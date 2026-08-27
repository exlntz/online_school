import type { JSX } from 'react';
import { SUBJECTS } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Card } from '../../../../shared/ui';
import styles from './SubscriptionSubjects.module.css';
import type { SubscriptionSubjectsProps } from './SubscriptionSubjects.props';


export const SubscriptionSubjects = ({ className, ...props }: SubscriptionSubjectsProps): JSX.Element => {
    const pickedSubjects = ['math', 'physics'];

    return (
        <Card variant="glass" className={className} {...props}>
            <div className={styles.header}>
                <h2 className={styles.title}>Мои предметы</h2>
                <p className={styles.subtitle}>
                    Подключено {pickedSubjects.length} предмета
                </p>
            </div>

            <div className={styles.grid}>
                {SUBJECTS.map((s) => {
                    const isPicked = pickedSubjects.includes(s.id);
                    const Icon = s.icon; 
                    
                    return (
                        <div
                            key={s.id}
                            className={cn(styles.card, {
                                [styles.active]: isPicked,
                                [styles.inactive]: !isPicked
                            })}
                        >
                            <div className={styles.iconWrap}>
                                <Icon size={18} />
                            </div>
                            <span className={styles.subjectName}>{s.label}</span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};