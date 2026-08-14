import { type JSX } from 'react'
import { Link } from 'react-router'
import LogoIcon from '../../../assets/icons/logo.svg?react'
import { cn } from '../../../utils/cn'
import styles from './Logo.module.css'
import type { LogoProps } from './Logo.props'


export const Logo = ( { className, variant='header', href='/', withText=true, ...props }: LogoProps ): JSX.Element => {
    return (
        <Link
            to={href}
            className={cn(styles.logoWrapper, styles[variant], className)} 
            aria-label="Из нуля в сотку" 
            {...props}
        >
            <LogoIcon className={styles.icon} />
            {withText && <span className={styles.text}>Из нуля в сотку</span>}
        </Link>
    )
}   