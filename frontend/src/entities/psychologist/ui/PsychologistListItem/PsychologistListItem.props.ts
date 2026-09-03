import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { PsychologistModel } from "../../model/types";

export interface PsychologistListItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    psychologist: PsychologistModel;
    onSelect: () => void;
}