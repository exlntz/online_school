import { type JSX } from 'react'
import { cn } from '../../../utils/cn'
import styles from './Marquee.module.css'
import type { MarqueeProps } from './Marquee.props'


export const Marquee = ( { className, items, separator='•', speed=40, textClassName, separatorClassName, repeatMultiplier=4, ...props }: MarqueeProps ): JSX.Element => {
    const multipliedItems = Array(repeatMultiplier).fill(items).flat();

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div 
                className={styles.track} 
                style={{ animationDuration: `${speed}s` }}
            >
                {[0, 1].map((groupId) => (
                    <div key={groupId} className={styles.group}>
                        {multipliedItems.map((item, index) => (
                            <span key={`${groupId}-${index}`} className={styles.item}>
                                <span className={cn(styles.text, textClassName)}>
                                    {item}
                                </span>
                                <span className={cn(styles.separator, separatorClassName)}>
                                    {separator}
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}