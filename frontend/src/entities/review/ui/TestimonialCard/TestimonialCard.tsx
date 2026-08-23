import { Quote, Star } from "lucide-react"
import { type JSX } from "react"
import { cn } from "../../../../shared/lib"
import { Divider } from "../../../../shared/ui"
import styles from './TestimonialCard.module.css'
import type { TestimonialCardProps } from "./TestimonialCard.props"


export const TestimonialCard = ( { className, name, subject, text, rating, offset, ...props }: TestimonialCardProps ): JSX.Element => {
    return (
        <article
            className={cn(
                styles.card, 
                offset && styles.cardOffset, 
                className
            )}
            {...props}
        >
            <Quote className={styles.quoteIcon} />
            
            <blockquote className={styles.quote}>
                {text}
            </blockquote>
            
            <Divider className={styles.separator} />
            
            <div className={styles.cardFooter}>
                <div className={styles.cardAuthor}>
                    <p className={styles.authorName}>{name}</p>
                    <p className={styles.authorSubject}>{subject}</p>
                </div>
                <div className={styles.cardStars}>
                    {Array.from({ length: rating ?? 0}).map((_, i) => (
                        <Star key={i} className={styles.starSmall} />
                    ))}
                </div>
            </div>
        </article>
    )
}