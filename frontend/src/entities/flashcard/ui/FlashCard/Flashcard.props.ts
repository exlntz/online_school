import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import type { FlashcardModel } from '../../model/types';


export interface FlashcardProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    card: FlashcardModel;
    flipped: boolean;
}