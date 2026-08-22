import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { StatItem } from '../../model/types';

export interface WidgetMetricProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    stats?: StatItem[];
}