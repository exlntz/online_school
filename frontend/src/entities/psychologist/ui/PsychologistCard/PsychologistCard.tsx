import { RefreshCw, Send } from 'lucide-react'; // 
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Badge, Button, Card, Rating } from '../../../../shared/ui';
import styles from './PsychologistCard.module.css';
import type { PsychologistCardProps } from './PsychologistCard.props';

export const PsychologistCard = ({ psychologist, telegramUrl, onChangeClick, className, ...props }: PsychologistCardProps): JSX.Element => {
    return (
        <Card variant="glass" className={cn(styles.card, className)} {...props}>
            <div className={styles.avatarWrap}>
                <img src={psychologist.photo} alt={psychologist.name} className={styles.avatar} loading="lazy" />
            </div>
            
            <div className={styles.info}>
                <div>
                    <div className={styles.headerRow}>
                        <h2 className={styles.name}>{psychologist.name}</h2>
                        
                        <Badge variant="soft" size="m" className={styles.ratingBadge}>
                            <Rating rating={psychologist.rating} />
                            <span>{psychologist.rating}</span>
                        </Badge>
                    </div>
                    <p className={styles.bio}>{psychologist.bio}</p>
                </div>

                <div className={styles.tags}>
                    {psychologist.tags.map((tag) => (
                        <Badge 
                            key={tag} 
                            variant="outline" 
                            size="s"
                            className={styles.badge}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {(telegramUrl || onChangeClick) && (
                    <div className={styles.actions}>
                        {telegramUrl && (
                            <Button as="a" href={telegramUrl} target="_blank" size="s" radius={14} disableJump>
                                <Send size={16} /> Написать в Telegram
                            </Button>
                        )}
                        {onChangeClick && (
                            <Button variant="soft" size="s" radius={14} onClick={onChangeClick}>
                                <RefreshCw size={16} /> Сменить специалиста
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};