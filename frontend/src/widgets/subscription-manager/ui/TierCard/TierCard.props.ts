import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface TierCardProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    name: string;
    price: string;
    features: string;
    isActive?: boolean;
}