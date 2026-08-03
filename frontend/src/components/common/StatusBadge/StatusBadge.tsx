import { type JSX } from 'react';
import { cn } from '../../../utils/cn';
import { Badge, Divider } from '../../ui';
import styles from './StatusBadge.module.css';
import type { StatusBadgeProps } from './StatusBadge.props';
import MortarboardIcon from './mortarboard.svg?react';


export const StatusBadge = ( { progress=0, statusText='В процессе', className, ...props }: StatusBadgeProps ): JSX.Element => {
    return (
        <div className={cn(styles.card, className)} {...props}>
            <div className={styles.statusHeader}>
                <MortarboardIcon />
                <span className={styles.statusHeaderText}>Статус обучения</span>
            </div>

            <div className={styles.progressRow}>
                <span className={styles.progressDot} />
                <Divider variant="primary" className={styles.progressDivider} />
                <span className={styles.progressDotEnd} />
            </div>

            <p className={styles.progressLabel}>ПРОГРЕСС: {progress}% К ЦЕЛИ</p>

            <Badge variant="glass" size="m">
                <span className={styles.pingDot}>
                    <span className={styles.pingRipple} />
                    <span className={styles.pingCore} />
                </span>
                <span className={styles.statusBadgeText}>{statusText}</span>
            </Badge>
        </div>
    )
}