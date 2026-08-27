import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Card } from '../../../../shared/ui';
import { PRACTICE_DIFFICULTY_TAGS } from '../../model/constants';
import styles from './PracticeFilters.module.css';
import type { PracticeFiltersProps } from './PracticeFilters.props';

export const PracticeFilters = ({ availableTopics, selectedTopics, onToggleTopic, selectedDifficulty, onChangeDifficulty, className, ...props }: PracticeFiltersProps): JSX.Element => {
    return (
        <Card variant='glass' className={className} {...props}>
            <div>
                <p className={styles.sectionTitle}>Темы</p>
                <div className={styles.tagsGroup}>
                    {availableTopics.map(({ topic, title }) => {
                        const isActive = selectedTopics.includes(topic);
                        return (
                            <button
                                key={topic}
                                type="button"
                                onClick={() => onToggleTopic(topic)}
                                aria-pressed={isActive}
                                className={cn(styles.tag, {
                                    [styles.tagActive]: isActive
                                })}
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <p className={styles.sectionTitle}>Уровень сложности</p>
                <div className={styles.tagsGroup}>
                    {PRACTICE_DIFFICULTY_TAGS.map(({ difficult, title }) => {
                        const isActive = selectedDifficulty === difficult;
                        return (
                            <button
                                key={difficult}
                                type="button"
                                onClick={() => onChangeDifficulty(difficult)}
                                aria-pressed={isActive}
                                className={cn(styles.tag, isActive && styles.tagActive)}
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
};