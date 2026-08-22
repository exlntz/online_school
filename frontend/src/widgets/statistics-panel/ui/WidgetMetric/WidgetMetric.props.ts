import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { StatItem } from '../../../../types/profile';

export interface WidgetMetricProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    stats?: StatItem[];
}