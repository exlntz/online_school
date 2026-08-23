import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PracticeActionCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    topicsCount: number;
    time?: number;
    onStart?: () => void;
}