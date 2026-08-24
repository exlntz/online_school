import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { TaskModel } from '../../model/types';

export interface TaskCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    task: TaskModel;
    isOpen: boolean;
    onToggle: () => void;
}