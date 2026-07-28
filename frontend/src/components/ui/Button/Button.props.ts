import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'outline-primary' | 'ghost' | 'ghost-secondary' | 'ghost-accent' | 'danger';
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'icon';
    arrow?: 'right' | 'right-up' | 'none'
    noBg?: boolean;
    isLoading?: boolean;
}