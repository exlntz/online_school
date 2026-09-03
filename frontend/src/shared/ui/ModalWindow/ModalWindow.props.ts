import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}