import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { headerMenu } from '../../../helpers/menu.helpers';
import { cn } from '../../../utils/cn';
import styles from './MobileMenu.module.css';
import type { MobileMenuProps } from './MobileMenu.props';
import { AuthBlock } from '../../auth';


export const MobileMenu = ( { user, isLoading, onLogout, onClose, className, ...props }: MobileMenuProps ): JSX.Element => {
    return (
        <div className={cn(styles.mobileMenu, className)} {...props}>
            {headerMenu.map((item) => (
                <Link
                    key={item.route}
                    to={item.route}
                    className={styles.mobileLink} 
                    onClick={onClose}
                >
                    {item.name}
                </Link>
            ))}

            <AuthBlock 
                user={user} 
                isLoading={isLoading} 
                onLogout={onLogout} 
                isMobile 
                className={styles.mobileAuth} 
            />
        </div>
    );
};