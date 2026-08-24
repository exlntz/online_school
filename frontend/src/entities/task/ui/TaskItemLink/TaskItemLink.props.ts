import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import type { TaskItem } from '../../model/types';

export interface TaskItemLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    topic: TaskItem;
}