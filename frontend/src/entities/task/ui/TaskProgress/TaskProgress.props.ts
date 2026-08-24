import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TaskProgressProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    solved: number;
    total: number;
}