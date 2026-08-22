import type { FC, SVGProps } from "react";

export type ActivityDay = {
    day: string;
    value: number; 
};

export type StatItem = {
    id: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    label: string;
    value: string | number;
};