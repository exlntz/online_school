import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { AuthMode, AuthValues } from "../../../../features/auth";


export interface PhoneStepProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: AuthMode;
    onSuccess: (data: AuthValues) => void;
}