import type { JSX } from 'react';
import { Link } from 'react-router';
import { cn } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import { TaskProgress } from '../TaskProgress/TaskProgress';
import styles from './TaskItemLink.module.css';
import type { TaskItemLinkProps } from './TaskItemLink.props';


export const TaskItemLink = ({ topic, className, href='#', ...props }: TaskItemLinkProps): JSX.Element => {
    return (
        <Link to={href} className={cn(styles.topicItem, className)} {...props}>
            <div className={styles.topicInfo}>
                <p className={styles.topicTitle}>{topic.title}</p>
                <TaskProgress solved={topic.solved} total={topic.total} />
            </div>
            
            <Button as="span" variant="outline-primary" size="xs" radius={20} disableJump>
                Решать
            </Button>
        </Link>
    );
};