import type { JSX } from 'react';
import { Link } from 'react-router';
import { useUser } from '../../../hooks/useUser';
import { cn } from '../../../utils/cn';
import { NotificationBtn, ThemeToggleBtn } from '../../navigation';
import { Button } from '../../ui';
import styles from './ProfileUserActions.module.css';
import type { ProfileUserActionsProps } from './ProfileUserActions.props';

export const ProfileUserActions = ({ className, ...props }: ProfileUserActionsProps): JSX.Element => {
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