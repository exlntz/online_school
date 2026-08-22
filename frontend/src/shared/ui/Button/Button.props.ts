import type { ComponentProps, ElementType } from "react";


export type ButtonOwnProps<E extends ElementType = ElementType> = {
    variant?: 'primary' | 'secondary' | 'outline' | 'outline-primary' | 'ghost' | 'ghost-secondary' | 'ghost-accent' | 'soft' | 'danger';
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'icon';
    arrow?: 'right' | 'right-up' | 'none'
    noBg?: boolean;
    isLoading?: boolean;
    iconSize?: string | number;
    radius?: string | number;
    disableJump?: boolean;
    as?: E;
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>

