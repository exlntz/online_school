import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import type { LessonModel } from '../../../types/profile';


export interface NextLessonProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    lesson?: LessonModel | null; 
}