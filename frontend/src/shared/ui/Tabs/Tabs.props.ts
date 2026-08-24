import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export type TabItem = {
    id: string;
    label: string;
    badge?: number;
};

export interface TabsProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
    tabs: TabItem[];
    activeTab: string;
    onChange: (id: string) => void;
}