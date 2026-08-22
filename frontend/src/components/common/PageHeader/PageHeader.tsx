import type { JSX } from 'react';
import { useLocation } from 'react-router';
import { PROFILE_NAV_ITEMS, SUBJECTS } from '../../../data/profile.data';
import { cn } from '../../../shared/lib';
import { useSubject } from '../../../store/subject/hooks';
import styles from './PageHeader.module.css';
import type { PageHeaderProps } from './PageHeader.props';


export const PageHeader = ({ title, className, ...props }: PageHeaderProps): JSX.Element => {
    
    const currentSubjectId = useSubject();
    const location = useLocation();

    const currentSubject = SUBJECTS.find((s) => s.id === currentSubjectId);
    const subjectLabel = currentSubject?.label || 'Предмет';

    const currentNavItem = PROFILE_NAV_ITEMS.find((item) => location.pathname === item.href);
    const description = currentNavItem?.description 

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <p className={styles.eyebrow}>
                Обучение &middot; {subjectLabel}
            </p>
            
            <h1 className={styles.title}>
                {title || currentNavItem?.label}
            </h1>
            
            {description && 
                <p className={styles.description}>
                    {description}
                </p>
            }
        </div>
    );
};