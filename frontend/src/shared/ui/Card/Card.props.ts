import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    footer?: ReactNode; 
    hoverable?: boolean;
    variant?: 'default' | 'glass';
}