import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { ActivityDay } from '../../model/types';


export interface WeeklyActivityProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data?: ActivityDay[];
}