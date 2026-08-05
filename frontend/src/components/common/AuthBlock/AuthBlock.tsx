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
                    <Link to="/login" className={styles.loginBtn}>Войти</Link>
                    <Link to="/register" className={styles.registerBtn}>Регистрация</Link>
                </>
            )}
        </div>
    )
}