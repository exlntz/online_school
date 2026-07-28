import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
    variant?: 'default' | 'primary' | 'primary-light' | 'dark';
    orientation?: 'horizontal' | 'vertical';
} 