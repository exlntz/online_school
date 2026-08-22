import type { DetailedHTMLProps, FC, HTMLAttributes, ReactNode, SVGProps } from "react";


export interface PricingCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    layout?: 'compact' | 'detailed';
    colorTheme?: 'default' | 'primary';
    isLifted?: boolean;
    badgeText?: string;
    tier: string;
    name: string;
    features: string[];
    featureIcon: FC<SVGProps<SVGSVGElement>>;
    actionButton: ReactNode;

    // compact
    duration?: string;
    label?: string;

    // detailed
    sub?: string;
    price?: string;
    unit?: string
}