import type { JSX } from "react";
import { Outlet } from "react-router";
import { cn } from "../../../shared/lib";
import styles from "./ProfileLayout.module.css";
import type { ProfileLayoutProps } from "./ProfileLayout.props";
import { ProfileHeader } from "../../../widgets/profile-header";

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
