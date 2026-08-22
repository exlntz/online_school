import type { JSX } from 'react';
import { Link } from 'react-router';
import { useUser } from '../../../../entities/user';
import { NotificationBtn } from '../../../../features/notifications';
import { ThemeToggleBtn } from '../../../../features/theme-switcher';
import { cn } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import styles from './UserActions.module.css';
import type { UserActionsProps } from './UserActions.props';

export const UserActions = ({ className, ...props }: UserActionsProps): JSX.Element => {
    const { data: user } = useUser();
    const initials = user ? `${user.firstName.charAt(0)}`.toUpperCase() : '';

    return (
        <div className={cn(styles.actionsGroup, className)} {...props}>
            <ThemeToggleBtn />
            <NotificationBtn />

            <Button 
                as={Link}
                to='/profile'
                variant="ghost-secondary" 
                className={styles.profileBtn}
                radius={20}
                aria-label="Профиль пользователя"
            >
                <span className={styles.avatar}>{initials}</span>
                <span className={styles.userInfo}>
                    <span className={styles.userName}>{user?.firstName || 'User01'}</span>
                    <span className={styles.userRole}>{user?.role}</span>
                </span>
            </Button>
        </div>
    );
};