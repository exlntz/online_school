import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { Role } from "../../../../entities/user";
import type { AuthMode } from "../../../../features/auth";


export interface CodeStepProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: AuthMode;
    phoneNumber: string;
    firstName?: string;
    role?: Role;
    onChangeNumber: () => void;
}