import type { JSX } from 'react';
import { SUBJECTS } from '../../../data/profile.data';
import { useSubject } from '../../../store/subject/hooks';
import { cn } from '../../../utils/cn';
import styles from './PageHeader.module.css';
import type { PageHeaderProps } from './PageHeader.props';


export const PageHeader = ({ title, className, children, ...props }: PageHeaderProps): JSX.Element => {
    
    const currentSubjectId = useSubject();

    const currentSubject = SUBJECTS.find((s) => s.id === currentSubjectId);
    const subjectLabel = currentSubject?.label || 'Предмет';

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <p className={styles.eyebrow}>
                Обучение &middot; {subjectLabel}
            </p>
            
            <h1 className={styles.title}>
                {title}
            </h1>
            
            <p className={styles.description}>
                {children}
            </p>
        </div>
    );
};