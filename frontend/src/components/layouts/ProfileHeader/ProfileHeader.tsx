import { type JSX } from 'react';
import { cn } from '../../../shared/lib';
import { Logo } from '../../navigation';
import { ProfileUserActions } from '../../profile';
import styles from './ProfileHeader.module.css';
import type { ProfileHeaderProps } from './ProfileHeader.props';


export const ProfileHeader = ( { className, ...props }: ProfileHeaderProps ): JSX.Element => {
    return (
        <header className={cn(styles.header, className)} {...props}>
            <Logo variant='profile' />

            <ProfileUserActions />
        </header>
    )
}