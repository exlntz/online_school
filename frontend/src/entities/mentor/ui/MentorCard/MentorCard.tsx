import { type JSX } from 'react'
import { Link } from 'react-router'
import { cn } from '../../../../shared/lib'
import { Badge } from '../../../../shared/ui'
import styles from './MentorCard.module.css'
import type { MentorCardProps } from './MentorCard.props'


export const MentorCard = ( { className, name, title, tags, img, profileUrl='#', ...props }: MentorCardProps ): JSX.Element => {
    return (
        <div className={cn(styles.card, className)} {...props}>
            <div className={styles.cardImage}>
                <img src={img} alt={name} loading="lazy" className={styles.cardImg} />
            </div>
            
            <div className={styles.cardBody}>
                <div>
                    <h3 className={styles.cardName}>{name}</h3>
                    <p className={styles.cardTitle}>{title}</p>
                </div>
                <div className={styles.cardFooter}>
                    <div className={styles.cardTags}>
                        {tags.map(t => (
                            <Badge key={t} variant="outline" size="s">{t}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className={styles.cardHover}>
                <Link to={profileUrl} className={styles.cardProfileLink}>
                    → Профиль
                </Link>
            </div>
        </div>
    )
}