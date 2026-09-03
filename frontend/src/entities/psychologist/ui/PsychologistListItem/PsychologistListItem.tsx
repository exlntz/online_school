import { MessageCircle, Star } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Button, Divider } from '../../../../shared/ui';
import styles from './PsychologistListItem.module.css';
import type { PsychologistListItemProps } from './PsychologistListItem.props';

export const PsychologistListItem = ({ psychologist, onSelect, className, ...props }: PsychologistListItemProps): JSX.Element => (
    <li className={cn(styles.item, className)} {...props}>
        <img src={psychologist.photo} alt={psychologist.name} className={styles.avatar} loading="lazy" />
        
        <div className={styles.info}>
            <div className={styles.header}>
                <h4 className={styles.name}>{psychologist.name}</h4>
                <span className={styles.rating}>
                    <Star size={14} className={styles.star} /> 
                    {psychologist.rating}
                </span>
            </div>
            
            <p className={styles.bio}>{psychologist.bio}</p>

            <Divider />
            
            <div className={styles.footer}>
                <Button
                    type='button'
                    variant='ghost-accent'
                    size='xs'
                    radius={12}
                >
                    <MessageCircle size={14} /> Читать отзывы ({psychologist.reviews})
                </Button>
                <Button size="xs" radius={12} onClick={onSelect} disableJump>
                    Выбрать
                </Button>
            </div>
        </div>
    </li>
);