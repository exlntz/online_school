import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { AuthMode } from "../../../../features/auth";
import type { Role } from "../../../../types/user";


export interface CodeStepProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    mode: AuthMode;
    phoneNumber: string;
    firstName?: string;
    role?: Role;
    onChangeNumber: () => void;
}