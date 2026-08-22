import type { JSX } from 'react';
import { ProfileUserActions } from '../../../../features/profile-actions';
import { cn } from '../../../../shared/lib';
import { Search } from '../../../../shared/ui';
import styles from './LearningHeader.module.css';
import type { LearningHeaderProps } from './LearningHeader.props';


export const LearningHeader = ({ className, ...props }: LearningHeaderProps): JSX.Element => {
    return (
        <header className={cn('glass', styles.header, className)} {...props}>
            <div className={styles.searchWrap}>
                <Search 
                    onSearch={(value) => console.log('Поиск:', value)} 
                    placeholder="Поиск по урокам, заданиям…" 
                    iconPosition="left"
                />
            </div>

            <ProfileUserActions className={styles.actions} />
        </header>
    );
};