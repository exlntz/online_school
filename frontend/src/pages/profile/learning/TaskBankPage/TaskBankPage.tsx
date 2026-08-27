import { useState, type JSX } from 'react';
import { TaskCard, type TaskModel } from '../../../../entities/task';
import { MOCK_TASK_BANK } from '../../../../shared/constants';
import { cn } from '../../../../shared/lib';
import { Container, Search } from '../../../../shared/ui';
import { PageHeader } from '../../../../widgets/page-header';
import styles from './TaskBankPage.module.css';


export const TaskBankPage = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openTask, setOpenTask] = useState<string | null>();

    const filteredBank = MOCK_TASK_BANK.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.number.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container variant='page'>
            <PageHeader />

            <Search
                onSearch={setSearchQuery}
                placeholder="Поиск по теме или номеру задания…"
                iconPosition="left"
            />

            <div className={styles.list}>
                {filteredBank.map((task) => (
                    <TaskCard
                        key={task.number}
                        task={task as TaskModel}
                        isOpen={openTask === task.number}
                        onToggle={() => setOpenTask(openTask === task.number ? null : task.number)}
                    />
                ))}
                
                {filteredBank.length === 0 && (
                    <div className={cn("glass", styles.notFound)}>
                        Ничего не найдено
                    </div>
                )}
            </div>
        </Container>
    );
};