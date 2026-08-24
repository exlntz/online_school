import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import styles from './TaskProgress.module.css';
import type { TaskProgressProps } from './TaskProgress.props';


export const TaskProgress = ({ solved, total, className, ...props }: TaskProgressProps): JSX.Element => {
    const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

    return (
        <div className={cn(styles.progressRow, className)} {...props}>
            <div className={styles.progressTrack}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className={styles.progressText}>
                {solved}/{total}
            </span>
        </div>
    );
};