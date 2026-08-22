import type { DetailedHTMLProps, HTMLAttributes } from "react";


export type SortEnum = 'Initial' | 'Name';

export interface SortProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
    sort: SortEnum;
    setSort: (sort: SortEnum) => void;
}
