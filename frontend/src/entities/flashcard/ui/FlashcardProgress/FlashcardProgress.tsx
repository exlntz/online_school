import { Lightbulb, Sparkles } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import styles from './FlashcardProgress.module.css';
import type { FlashcardProgressProps } from './FlashcardProgress.props';

export const FlashcardProgress = ({ currentIndex, total, fromMistake, className, ...props }: FlashcardProgressProps): JSX.Element => {
    return (
        <div className={cn(styles.headerInfo, className)} {...props}>
            <span className={styles.counter}>
                <Sparkles size={16} className={styles.counterIcon} />
                Карточка {currentIndex + 1} из {total}
            </span>
            {fromMistake && (
                <span className={styles.mistakeBadge}>
                    <Lightbulb size={14} className={styles.mistakeIcon} />
                    Работа над ошибками
                </span>
            )}
        </div>
    );
};