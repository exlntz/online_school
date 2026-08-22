import type { JSX } from 'react';
import { NavLink } from 'react-router';
import { PROFILE_NAV_ITEMS } from '../../../../data/profile.data';
import { SubjectSelector } from '../../../../entities/subject';
import { cn } from '../../../../shared/lib';
import styles from './Sidebar.module.css';
import type { SidebarProps } from './Sidebar.props';
import { Logo } from '../../../../components/navigation';


export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <aside className={cn('glass', styles.sidebar, className)} {...props}>
      
      <Logo variant='profile' className={styles.sidebarLogo} />

      <nav className={styles.nav} aria-label="Основная навигация">
        {PROFILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.id}
              to={item.href}
              end={item.href === '/profile/learning'}
              className={({ isActive }) => cn(styles.navBtn, {
                [styles.navBtnActive]: isActive
              })}
            >
              <Icon width={18} height={18} />
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </NavLink>
          );
        })}
      </nav>

      <SubjectSelector />
      
    </aside>
  );
};