import type { JSX } from 'react';
import { MOCK_WIDGET_METRIC } from '../../../data/temp.data';
import { cn } from '../../../shared/lib';
import styles from './WidgetMetric.module.css';
import type { WidgetMetricProps } from './WidgetMetric.props';


export const WidgetMetric = ({ 
    stats = MOCK_WIDGET_METRIC, 
    className, 
    ...props 
}: WidgetMetricProps): JSX.Element => {
    
    return (
        <div className={cn(styles.grid, className)} {...props}>
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div key={stat.id} className={styles.item}>
                        <Icon width={16} height={16} className={styles.icon} />
                        <span className={styles.value}>{stat.value}</span>
                        <span className={styles.label}>{stat.label}</span>
                    </div>
                );
            })}
        </div>
    );
};