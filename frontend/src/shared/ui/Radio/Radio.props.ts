import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    children: ReactNode;
}