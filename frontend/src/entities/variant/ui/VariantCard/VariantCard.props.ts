import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { VariantModel } from "../../model/types";


export interface VariantCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variant: VariantModel;
}