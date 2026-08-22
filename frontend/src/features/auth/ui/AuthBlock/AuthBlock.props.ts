import type { DetailedHTMLProps, HTMLAttributes } from "react";
import type { User } from "../../../../types/user";


export interface AuthBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    user: User | null | undefined;
    isLoading: boolean;
    onLogout: () => void;
    isMobile?: boolean;
}