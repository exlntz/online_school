import type { DetailedHTMLProps, HTMLAttributes } from "react";


export interface StatusBadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    progress?: number;
    statusText?: string;
}