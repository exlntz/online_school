import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { User } from "../../../../entities/user";


export interface AuthBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    user: User | null | undefined;
    isLoading: boolean;
    onLogout: () => void;
    isMobile?: boolean;
}