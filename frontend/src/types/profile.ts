import type { FC, SVGProps } from "react";

export type ActivityDay = {
    day: string;
    value: number; 
};

export type LessonModel = {
    id: string;
    title: string;
    moduleNumber: number;
    moduleTopic: string;
    lessonNumber: number;
    lessonTotal: number;
    duration: number; 
    isWebinar?: boolean; 
}

export interface NavItem {
    id: string;
    href: string;
    label: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    description?: string;
    badge?: number;
}

export type StatItem = {
    id: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    label: string;
    value: string | number;
};