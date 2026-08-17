import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface StatsPanelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    subject?: string;
}