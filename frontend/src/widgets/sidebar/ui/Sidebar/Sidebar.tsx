import type { JSX } from 'react';
import { NavLink } from 'react-router';
import { SubjectSelector } from '../../../../entities/subject';
import { PROFILE_NAV_ITEMS } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Logo } from '../../../../shared/ui';
import { useNavBadges } from '../../model/useNavBadges';
import styles from './Sidebar.module.css';
import type { SidebarProps } from './Sidebar.props';


export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const badges = useNavBadges();
  
  return (
    <aside className={cn('glass', styles.sidebar, className)} {...props}>
      
      <Logo variant='profile' className={styles.sidebarLogo} />

      <nav className={styles.nav} aria-label="Основная навигация">
        {PROFILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const badgeCount = badges[item.id];
          
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
              {!!badgeCount && badgeCount > 0 && (
                <span className={styles.badge}>{badgeCount}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <SubjectSelector />
      
    </aside>
  );
};