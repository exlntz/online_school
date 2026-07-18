import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AuthFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: 'login' | 'register'
}

export type AuthValues = {
    name?: string;
    phone: string;
}