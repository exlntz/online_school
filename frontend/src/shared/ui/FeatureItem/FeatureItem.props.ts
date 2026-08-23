import type { DetailedHTMLProps, FC, HTMLAttributes, Ref, SVGProps } from "react";


export interface FeatureItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    num: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
    hasDivider?: boolean;
    delay?: number;
    iconSize?: number | string;
    ref?: Ref<HTMLLIElement>; 
}