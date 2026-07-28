import type { DetailedHTMLProps, HTMLAttributes } from "react";


export interface TestimonialCardProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
    name: string;
    subject: string;
    text: string;
    rating?: number;
    offset?: boolean;
}