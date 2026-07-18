import { useQueryClient } from '@tanstack/react-query';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import styles from './Header.module.css';



export const Header = (): JSX.Element => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('temp_mock_token');
    localStorage.removeItem('temp_mock_email'); 
    queryClient.setQueryData(['user'], null); 
    navigate('/');
  };

  return (
    <>
      <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Из нуля в сотку">
            Из нуля в сотку
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            <Link to="/pricing" className={styles.navLink}>Тарифы</Link>
          </nav>

          {/* Desktop actions */}
          <div className={styles.auth}>
            {isLoading ? (
              <span className={styles.loadingText}>Загрузка...</span>
            ) : user ? (
              <div className={styles.userProfile}>
                <Link to="/profile" className={styles.userName}>{user.name}</Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>Выйти</button>
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/pricing" className={styles.mobileLink}>Тарифы</Link>
            <div className={styles.mobileAuth}>
              {isLoading ? (
                <span className={styles.loadingText}>Загрузка...</span>
              ) : user ? (
                <div className={styles.mobileUserProfile}>
                  <span className={styles.userName}>{user.name}</span>
                  <button onClick={handleLogout} className={styles.logoutBtn}>Выйти</button>
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
    </>
  );
}
