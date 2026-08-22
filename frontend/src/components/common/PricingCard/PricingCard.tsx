import { type JSX } from 'react';
import { cn } from '../../../shared/lib';
import { Badge, Divider } from '../../../shared/ui';
import styles from './PricingCard.module.css';
import type { PricingCardProps } from './PricingCard.props';


export const PricingCard = ( {
    layout='compact',
    colorTheme='default',
    isLifted=true,
    badgeText,
    tier,
    name,
    features,
    featureIcon: Icon,
    actionButton,
    duration,
    label,
    sub,
    price,
    unit,
    className,
    ...props
}: PricingCardProps ): JSX.Element => {
    const isDetailed = layout === 'detailed'
    const isPrimary = colorTheme === 'primary'

    return (
        <div
            className={cn(
                styles.card,
                isPrimary && styles.cardPrimary,
                isLifted && styles.cardLifted,
                className
            )}
            {...props}
        >
            {!isDetailed && (
                <Icon
                    width={24} 
                    height={24}
                    className={cn(styles.bgIcon, isPrimary && styles.bgIconPrimary)}
                    aria-hidden="true"
                />
            )}

            {badgeText && (
                <div className={isDetailed ? styles.badgeWrapDetailed : styles.badgeWrapCompact}>
                    <Badge variant={isPrimary ? 'secondary' : 'primary'} size="m">
                        {badgeText}
                    </Badge>
                </div>
            )}

            <p className={cn(styles.tier, isDetailed && styles.tierDetailed, isPrimary && styles.textMutedPrimary)}>
                {tier}
            </p>
            <h3 className={cn(styles.name, isDetailed && styles.nameDetailed, isPrimary && styles.textWhite)}>
                {name}
            </h3>

            {isDetailed ? (
                <>
                    {sub && <p className={styles.sub}>{sub}</p>}
                    <div className={styles.priceRow}>
                        <span className={styles.priceNum}>{price}</span>
                        <span className={styles.priceUnit}>{unit}</span>
                    </div>
                </>
            ) : (
                <>
                    {duration && <p className={cn(styles.duration, isPrimary && styles.textMutedPrimary)}>{duration}</p>}
                    {label && <p className={cn(styles.label, isPrimary && styles.textWhite)}>{label}</p>}
                </>
            )}

            <Divider 
                variant={isPrimary ? 'glass' : 'default'} 
                className={styles.separator} 
            />

            <ul className={styles.featureList}>
                {features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                        <Icon
                            className={cn(
                                styles.featureIcon,
                                isDetailed && styles.featureIconDetailed,
                                isPrimary && styles.featureIconPrimary
                            )}
                            aria-hidden="true"
                        />
                        <span className={cn(styles.featureText, isDetailed && styles.featureTextDetailed, isPrimary && styles.textWhite)}>
                            {f}
                        </span>
                    </li>
                ))}
            </ul>

            <div className={cn(styles.footer, isDetailed && styles.footerDetailed)}>
                {actionButton}
            </div>
        </div>
    )
}