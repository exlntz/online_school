import type { JSX } from 'react';
import { cn } from '../../lib';
import styles from './Tabs.module.css';
import type { TabsProps } from './Tabs.props';

export const Tabs = ({ tabs, activeTab, onChange, className, ...props }: TabsProps): JSX.Element => {
    return (
        <div className={cn('glass', styles.tabs, className)} role="tablist" {...props}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={cn(styles.tab, {
                            [styles.tabActive]: isActive
                        })}
                    >
                        {tab.label}
                        
                        {tab.badge ? (
                            <span className={styles.badge}>{tab.badge}</span>
                        ) : null}
                    </button>
                );
            })}
        </div>
    );
};