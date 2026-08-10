import { Bell } from 'lucide-react';
import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { cn } from '../../../utils/cn';
import { Logo, ThemeToggleBtn } from '../../navigation';
import { Button } from '../../ui';
import styles from './ProfileHeader.module.css';
import type { ProfileHeaderProps } from './ProfileHeader.props';


export const ProfileHeader = ( { className, ...props }: ProfileHeaderProps ): JSX.Element => {
    const { data: user } = useUser();

    const initials = user
        ? `${user.firstName.charAt(0)}`.toUpperCase()
        : ''
    
    return (
        <header className={cn(styles.header, className)} {...props}>
            <Logo variant='profile' />

            <div className={styles.actionsGroup}>
                <ThemeToggleBtn />

                <Button 
                    variant="outline" 
                    size="icon" 
                    iconSize={40}
                    className={styles.bellBtn}
                    aria-label="Уведомления"
                >
                <Bell size={20} strokeWidth={1.75} />
                <span className={styles.bellIndicator} />
                </Button>

                <Button 
                    as={Link}
                    to='/profile'
                    variant="outline" 
                    className={styles.profileBtn}
                    aria-label="Профиль пользователя"
                >
                    <span className={styles.profileAvatar}>{initials}</span>
                    <span className={styles.profileName}>{user?.firstName}</span>
                </Button>
            </div>
        </header>
    )
}