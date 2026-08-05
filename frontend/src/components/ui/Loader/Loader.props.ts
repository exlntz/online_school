import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface LoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 's' | 'm' | 'l';
    variant?: 'primary' | 'white' | 'current';
    text?: string;
}