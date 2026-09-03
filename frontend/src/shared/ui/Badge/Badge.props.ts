import type { DetailedHTMLProps, HTMLAttributes } from "react";


export interface BadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'soft';
    size?: 's' | 'm' | 'l';  
}