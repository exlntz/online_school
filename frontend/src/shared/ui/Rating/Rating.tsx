import { Star } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import styles from './Rating.module.css';
import type { RatingProps } from './Rating.props';


export const Rating = ({ 
    rating, 
    maxStars = 5, 
    starSize = 14, 
    className, 
    ...props 
}: RatingProps): JSX.Element => {
    const roundedRating = Math.round(rating);

    return (
        <div 
            className={cn(styles.wrapper, className)} 
            aria-label={`Рейтинг ${rating} из ${maxStars}`}
            {...props}
        >
            {Array.from({ length: maxStars }).map((_, i) => (
                <Star
                    key={i}
                    size={starSize}
                    className={cn(styles.star, {
                        [styles.filled]: i < roundedRating
                    })}
                />
            ))}
        </div>
    );
};