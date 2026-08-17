import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { ActivityDay } from '../../../types/profile';


export interface WeeklyActivityProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data?: ActivityDay[];
}