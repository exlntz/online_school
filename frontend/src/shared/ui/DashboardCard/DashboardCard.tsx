import { ArrowUpRight } from 'lucide-react';
import { type JSX } from 'react';
import { Link } from 'react-router';
import { cn } from '../../../shared/lib';
import styles from './DashboardCard.module.css';
import type { DashboardCardProps } from './DashboardCard.props';


export const DashboardCard = ( { title, description, icon: Icon, href='/', className, ...props }: DashboardCardProps ): JSX.Element => {

    return (    
        <Link to={href} className={cn(styles.card, className)} {...props}>
            <div className={styles.glow} />

            <div className={styles.header}>
                <div className={styles.iconWrap}>
                    <Icon width={24} height={24} strokeWidth={1.75} />
                </div>
                <ArrowUpRight className={styles.arrow} size={20} />
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </Link>
    )
}