import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { ProfileHeader } from "../";
import { cn } from "../../../utils/cn";
import styles from "./ProfileLayout.module.css";
import type { ProfileLayoutProps } from "./ProfileLayout.props";

export const ProfileLayout = ({ className, ...props }: ProfileLayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.layout, className)} {...props}>
      <ProfileHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
