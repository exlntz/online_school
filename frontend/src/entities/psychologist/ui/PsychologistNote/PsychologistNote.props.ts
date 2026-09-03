import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { PsychologistNoteModel } from "../../model/types";

export interface PsychologistNoteProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    note: PsychologistNoteModel;
}