import type { JSX } from "react";
import { Outlet } from "react-router";
import { cn } from "../../../shared/lib";
import { LearningHeader } from "../LearningHeader/LearningHeader";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./LearningLayout.module.css";
import type { LearningLayoutProps } from "./LearningLayout.props";

export const LearningLayout = ({ className, ...props }: LearningLayoutProps): JSX.Element => {
  return (
    <div className={cn(styles.layout, className)} {...props}>
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.main}>
          <LearningHeader />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};