import { useQueryClient } from '@tanstack/react-query';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../api/auth';
import { useTheme } from '../../../hooks/useTheme';
import { useUser } from '../../../hooks/useUser';
import { cn } from '../../../utils/cn';
import { Button, Container } from '../../ui';
import styles from './Header.module.css';
import type { HeaderProps } from './Header.props';



export const Header = ( { className, ...props }: HeaderProps ): JSX.Element => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const { data: user, isLoading } = useUser();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      queryClient.setQueryData(['user'], null);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе', error)
    }
  };

  return (
    <header className={cn(styles.header, {
      [styles.scrolled]: scrolled,
      className
    })} {...props}>
      <Container className={styles.headerContent}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Из нуля в сотку">
          Из нуля в сотку
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          <Link to="/pricing" className={styles.navLink}>Тарифы</Link>
        </nav>

        {/* Desktop actions */}
        <div className={styles.actionsGroup}>
          <Button 
            variant="ghost-accent" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Сменить тему"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <div className={styles.auth}>
            {isLoading ? (
              <span className={styles.loadingText}>Загрузка...</span>
            ) : user ? (
              <div className={styles.userProfile}>
                <Link to="/profile" className={styles.userName}>{user.firstName}</Link>
                <Button 
                  variant="danger" 
                  size="s" 
                  onClick={handleLogout} 
                >
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

          {/* Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/pricing" className={styles.mobileLink}>Тарифы</Link>
          <div className={styles.mobileAuth}>
            {isLoading ? (
              <span className={styles.loadingText}>Загрузка...</span>
            ) : user ? (
              <div className={styles.mobileUserProfile}>
                <span className={styles.userName}>{user.firstName}</span>
                <Button 
                  variant="danger" 
                  size="s" 
                  onClick={handleLogout} 
                >
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
        </div>
      )}
    </header>
    
  );
}
