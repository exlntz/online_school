import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PageHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title: string;
}