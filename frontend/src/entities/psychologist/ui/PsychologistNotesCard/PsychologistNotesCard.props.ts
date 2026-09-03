import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { PsychologistNoteModel } from "../../model/types";

export interface PsychologistNotesCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    notes: PsychologistNoteModel[];
}