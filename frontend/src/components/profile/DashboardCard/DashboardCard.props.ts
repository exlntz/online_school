import type { AnchorHTMLAttributes, DetailedHTMLProps, FC, SVGProps } from "react";


export interface DashboardCardProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    title: string;
    description: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}