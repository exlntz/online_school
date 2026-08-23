import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { PracticeTopic } from '../../model/types';

export interface PracticeFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    availableTopics: PracticeTopic[];
    selectedTopics: string[];
    onToggleTopic: (tag: string) => void;
    selectedDifficulty: number;
    onChangeDifficulty: (difficult: number) => void;
}