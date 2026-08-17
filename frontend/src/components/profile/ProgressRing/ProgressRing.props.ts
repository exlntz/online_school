import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProgressRingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    value?: number;
    size?: number;
    stroke?: number;
}