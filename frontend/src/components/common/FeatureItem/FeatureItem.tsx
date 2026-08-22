import { type JSX } from 'react';
import { cn } from '../../../shared/lib';
import { Divider } from '../../../shared/ui';
import styles from './FeatureItem.module.css';
import type { FeatureItemProps } from './FeatureItem.props';


export const FeatureItem = ( { 
    num, 
    icon: Icon, 
    title,
    description,
    hasDivider=true,
    delay=0,
    iconSize=24,
    className,
    ref,
    ...props
}: FeatureItemProps ): JSX.Element => {
    return (
        <li
            ref={ref}
            className={cn(styles.listItem, className)}
            style={{ transitionDelay: `${delay}ms`, ...props.style }}
            {...props}
        >
            <div className={styles.itemMeta}>
                <span className={styles.itemNum}>{num}</span>
                <div className={styles.itemIconWrap}>
                    <Icon width={iconSize} height={iconSize} className={styles.itemIcon} aria-hidden="true" />
                </div>
            </div>

            <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.itemDesc}>{description}</p>
                <div className={styles.itemLine}>
                    <div className={styles.itemLineLine}></div>
                    <div className={styles.itemLineDot}></div>
                </div>
            </div>

            {hasDivider && <Divider className={styles.itemDivider} />}
        </li>
    )
}