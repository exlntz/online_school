import { ChevronDown } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { TaskItemLink } from '../TaskItemLink/TaskItemLink';
import styles from './TaskCard.module.css';
import type { TaskCardProps } from './TaskCard.props';


export const TaskCard = ({ task, isOpen, onToggle, className, ...props }: TaskCardProps): JSX.Element => {
    return (
        <div className={cn('glass', styles.card, className)} {...props}>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className={styles.header}
            >
                <span className={styles.numberBadge}>{task.number}</span>
                
                <div className={styles.info}>
                    <h3 className={styles.title}>{task.title}</h3>
                    <p className={styles.meta}>{task.meta}</p>
                </div>
                
                <ChevronDown
                    className={cn(styles.chevron, {
                        [styles.chevronOpen]: isOpen
                    })}
                />
            </button>

            {isOpen && (
                <ul className={styles.body}>
                    {task.topics.map((topic) => (
                        <li key={topic.title}>
                            <TaskItemLink topic={topic} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};