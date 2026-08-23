import { useState, type JSX } from 'react';
import { useSubject } from '../../../../entities/subject';
import { cn } from '../../../../shared/lib';
import { PRACTICE_TOPIC_TAGS } from '../../model/constants';
import { PracticeActionCard } from '../PracticeActionCard/PracticeActionCard';
import { PracticeFilters } from '../PracticeFilters/PracticeFilters';
import styles from './PracticeSetup.module.css';
import type { PracticeSetupProps } from './PracticeSetup.props';

export const PracticeSetup = ({ onStart, className, ...props }: PracticeSetupProps): JSX.Element => {
    const subjectId = useSubject();
    const availableTopics = PRACTICE_TOPIC_TAGS[subjectId] || PRACTICE_TOPIC_TAGS['math'];

    const [topics, setTopics] = useState<string[]>(
        availableTopics.slice(0, 2).map((item) => item.topic)
    );
    const [difficulty, setDifficulty] = useState<number>(0);

    const toggleTopic = (topicKey: string) => {
        setTopics((prev) =>
            prev.includes(topicKey) ? prev.filter((t) => t !== topicKey) : [...prev, topicKey]
        );
    };

    const handleStart = () => {
        if (onStart) {
            onStart(topics, difficulty);
        }
    };

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <PracticeFilters 
                availableTopics={availableTopics}
                selectedTopics={topics}
                onToggleTopic={toggleTopic}
                selectedDifficulty={difficulty}
                onChangeDifficulty={setDifficulty}
            />

            <PracticeActionCard 
                topicsCount={topics.length} 
                onStart={handleStart}
            />
        </div>
    );
};