import { type JSX } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { Button, Loader } from '../../ui';
import styles from './AuthBlock.module.css';
import type { AuthBlockProps } from './AuthBlock.props';


export const AuthBlock = ( { user, isLoading, onLogout, isMobile, className, ...props }: AuthBlockProps ): JSX.Element => {
    return (
        <div className={cn(className)} {...props}>
            {isLoading ? (
                <Loader size="s" className={styles.loadingWrapper} />
            ) : user ? (
                <div className={isMobile ? styles.mobileUserProfile : styles.userProfile}>
                    <Link to="/profile" className={styles.userName}>
                        {user.firstName}
                    </Link>
                    <Button variant="danger" size="s" onClick={onLogout}>
                        Выйти
                    </Button>
                </div>
            ) : (
                <>
                    <Button as={Link} to="/login" variant="soft" size="s" radius={12}>
                        Войти
                    </Button>

                    <Button as={Link} to="/register" variant="primary" size="s" radius={12} disableJump>
                        Регистрация
                    </Button>
                </>
            )}
        </div>
    )
}