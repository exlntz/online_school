import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { LessonModel } from '../../../types/profile';


export interface UpcomingLessonsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
    lessons?: LessonModel[];
}