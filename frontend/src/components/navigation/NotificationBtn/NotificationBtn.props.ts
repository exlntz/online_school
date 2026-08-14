import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface NotificationBtnProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    hasUnread?: boolean;
    iconSize?: number;
}