import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { PsychologistModel } from "../../model/types";

export interface PsychologistCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    psychologist: PsychologistModel;
    telegramUrl?: string;
    onChangeClick?: () => void;
}