import type { JSX } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { cn } from "../../../utils/cn";
import { Loader } from "../../ui";
import styles from "./RequireAuth.module.css";
import type { RequireAuthProps } from "./RequireAuth.props";


export const RequireAuth = ({ className, children, ...props }: RequireAuthProps): JSX.Element => {
    const { data: user, isLoading } = useUser();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className={cn(styles.loaderWrapper, className)} {...props}>
                <Loader size="l" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};