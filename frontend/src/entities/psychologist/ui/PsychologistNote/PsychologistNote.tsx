import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import styles from './PsychologistNote.module.css';
import type { PsychologistNoteProps } from './PsychologistNote.props';


export const PsychologistNote = ({ note, className, ...props }: PsychologistNoteProps): JSX.Element => (
    <li className={cn(styles.note, className)} {...props}>
        <p className={styles.text}>{note.text}</p>
        <p className={styles.date}>{note.date}</p>
    </li>
);