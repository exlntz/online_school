import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import styles from './Flashcard.module.css';
import type { FlashcardProps } from './Flashcard.props';

export const Flashcard = ({ card, flipped, className, ...props }: FlashcardProps): JSX.Element => {
    return (
        <button
            type="button"
            className={cn(
                'glass',
                styles.cardButton,
                flipped && 'glow-blue',
                flipped && styles.cardFlipped,
                className
            )}
            {...props}
        >
            <span className={styles.topic}>
                {card.topic}
            </span>
            {flipped ? (
                <p className={styles.backText}>{card.back}</p>
            ) : (
                <p className={styles.frontText}>{card.front}</p>
            )}
            <span className={styles.hint}>
                {flipped ? 'Нажмите, чтобы скрыть' : 'Нажмите, чтобы увидеть ответ'}
            </span>
        </button>
    );
};