import type { DetailedHTMLProps, HTMLAttributes } from "react";


export interface ContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'default' | 'layout';
}