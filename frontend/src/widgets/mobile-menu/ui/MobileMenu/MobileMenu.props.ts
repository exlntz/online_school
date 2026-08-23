import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { User } from "../../../../entities/user";


export interface MobileMenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    user: User | null | undefined;
    isLoading: boolean;
    onLogout: () => void;
    onClose: () => void;
}