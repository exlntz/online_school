import { Quote } from 'lucide-react';
import type { JSX } from 'react';
import { Card } from '../../../../shared/ui';
import { PsychologistNote } from '../PsychologistNote/PsychologistNote';
import styles from './PsychologistNotesCard.module.css';
import type { PsychologistNotesCardProps } from './PsychologistNotesCard.props';

export const PsychologistNotesCard = ({ notes, className, ...props }: PsychologistNotesCardProps): JSX.Element => {
    return (
        <Card variant="glass" className={className} {...props}>
            <div className={styles.header}>
                <Quote className={styles.icon} size={16} />
                <h2 className={styles.title}>Наставления</h2>
            </div>
            
            {notes ? (
                <ul className={styles.list}>
                    {notes.map((note) => (
                        <PsychologistNote key={note.id} note={note} />
                    ))}
                </ul>
            ) : (
                <p className={styles.emptyState}>
                    Скоро здесь появятся наставления и полезные советы от вашего психолога.
                </p>
            )}
        </Card>
    );
};