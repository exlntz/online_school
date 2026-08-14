import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProfileHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant?: 'default' | 'learning';
}
