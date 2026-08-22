import { type JSX } from 'react';
import { ProfileUserActions } from '../../../../features/profile-actions';
import { cn } from '../../../../shared/lib';
import styles from './ProfileHeader.module.css';
import type { ProfileHeaderProps } from './ProfileHeader.props';
import { Logo } from '../../../../shared/ui';


export const ProfileHeader = ( { className, ...props }: ProfileHeaderProps ): JSX.Element => {
    return (
        <header className={cn(styles.header, className)} {...props}>
            <Logo variant='profile' />

            <ProfileUserActions />
        </header>
    )
}