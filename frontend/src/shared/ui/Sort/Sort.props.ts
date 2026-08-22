import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { SortEnum } from "../../../types/sort";


export interface SortProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'> {
    sort: SortEnum;
    setSort: (sort: SortEnum) => void;
}
