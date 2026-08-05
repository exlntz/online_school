import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";


export interface MarqueeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    items: string[];
    separator?: ReactNode;
    speed?: number;
    textClassName?: string; 
    separatorClassName?: string;
    repeatMultiplier?: number;
}