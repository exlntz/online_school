import { useState, type JSX } from 'react';
import { HomeworkCard, type HomeworkStatus } from '../../../../entities/homework';
import { MOCK_HOMEWORK } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Container, Tabs } from '../../../../shared/ui';
import type { TabItem } from '../../../../shared/ui/Tabs/Tabs.props';
import { PageHeader } from '../../../../widgets/page-header';
import styles from './HomeworkPage.module.css';


export const HomeworkPage = (): JSX.Element => {
    const [activeFilter, setActiveFilter] = useState<HomeworkStatus>('current');

    const visibleHomework = MOCK_HOMEWORK.filter((hw) => hw.status === activeFilter);
    const overdueCount = MOCK_HOMEWORK.filter((hw) => hw.status === 'overdue').length;

    const tabsConfig: TabItem[] = [
        { id: 'current', label: 'Текущие' },
        { id: 'done', label: 'Выполненные' },
        { id: 'overdue', label: 'Просроченные', badge: overdueCount > 0 ? overdueCount : undefined },
    ];

    return (
        <Container variant="page">
            <PageHeader />

            <div className={styles.container}>
                
                <Tabs 
                    tabs={tabsConfig} 
                    activeTab={activeFilter} 
                    onChange={(status) => setActiveFilter(status as HomeworkStatus)} 
                />

                <div className={styles.list}>
                    {visibleHomework.map((hw) => (
                        <HomeworkCard key={hw.title} homework={hw} />
                    ))}

                    {visibleHomework.length === 0 && (
                        <div className={cn('glass', styles.empty)}>
                            Не найдено.
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};