import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import type { LessonModel } from '../../model/types';

export interface NextLessonProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    lesson?: LessonModel | null; 
}