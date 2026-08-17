import type { JSX } from 'react';
import { MOCK_DATA_WEEKLY_ACTIVITY } from '../../../data/temp.data';
import { cn } from '../../../utils/cn';
import styles from './WeeklyActivity.module.css';
import type { WeeklyActivityProps } from './WeeklyActivity.props';


export const WeeklyActivity = ({ 
    data = MOCK_DATA_WEEKLY_ACTIVITY, 
    className, 
    ...props 
}: WeeklyActivityProps): JSX.Element => {
    
    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div className={styles.header}>
                <h3 className={styles.title}>Активность за неделю</h3>
                <span className={styles.unit}>ч/день</span>
            </div>
            
            <div className={styles.chart} aria-hidden="true">
                {data.map((d) => (
                    <div key={d.day} className={styles.column}>
                        <div className={styles.track}>
                            <div
                                className={styles.bar}
                                style={{
                                    height: `${d.value}%`,
                                    opacity: 0.35 + (d.value * 0.01) * 0.65,
                                }}
                            />
                        </div>
                        <span className={styles.dayLabel}>{d.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};