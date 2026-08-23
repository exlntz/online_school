import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";


export interface LogoProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    variant?: 'header' | 'footer' | 'profile';
    withText?: boolean;
}