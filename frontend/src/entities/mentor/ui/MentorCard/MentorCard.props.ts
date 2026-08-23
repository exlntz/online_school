import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MentorCardProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
    name: string;
    title: string;
    tags: string[];
    img: string;
    profileUrl?: string;
}