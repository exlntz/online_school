import { useQueryClient } from '@tanstack/react-query';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router';
import { logoutUser } from '../../../../api/auth';
import { AuthBlock } from '../../../../features/auth';
import { ThemeToggleBtn } from '../../../../features/theme-switcher';
import { headerMenu } from '../../../../helpers/menu.helpers';
import { useUser } from '../../../../hooks/useUser';
import { cn } from '../../../../shared/lib';
import { Container, Logo } from '../../../../shared/ui';
import { MobileMenu } from '../../../mobile-menu';
import styles from './Header.module.css';
import type { HeaderProps } from './Header.props';


export const Header = ( { className, ...props }: HeaderProps ): JSX.Element => {
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      queryClient.setQueryData(['user'], null);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе', error)
    }
  };

  const handleCloseMobileMenu = () => setMobileOpen(false);

  return (
    <header className={cn(styles.header, {
      [styles.scrolled]: scrolled,
      className
    })} {...props}>
      <Container className={styles.headerContent}>
        {/* Logo */}
        <Logo variant="header" />

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {headerMenu.map((item) => (
            <Link key={item.route} to={item.route} className={styles.navLink}>{item.name}</Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className={styles.actionsGroup}>
          <ThemeToggleBtn iconSize={35} />

          <AuthBlock 
            user={user} 
            isLoading={isLoading} 
            onLogout={handleLogout} 
            className={styles.auth} 
          />

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
        <MobileMenu 
          user={user} 
          isLoading={isLoading} 
          onLogout={handleLogout} 
          onClose={handleCloseMobileMenu} 
        />
      )}
    </header>
  );
}
