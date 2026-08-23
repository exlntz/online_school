import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PracticeSetupProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
    onStart?: (topics: string[], difficulty: number) => void;
}