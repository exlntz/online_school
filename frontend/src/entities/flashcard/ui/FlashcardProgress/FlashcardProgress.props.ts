import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FlashcardProgressProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    currentIndex: number;
    total: number;
    fromMistake?: boolean;
}