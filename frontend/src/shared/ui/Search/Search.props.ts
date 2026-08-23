import type { DetailedHTMLProps, HTMLAttributes } from "react";


export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    onSearch: (value: string) => void;
    placeholder?: string;
    iconPosition?: 'left' | 'right';
}

