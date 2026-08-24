import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { HomeworkModel } from '../../model/types';

export interface HomeworkCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    homework: HomeworkModel;
}