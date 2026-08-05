import { type JSX } from 'react'
import { cn } from '../../../utils/cn'
import styles from './Container.module.css'
import type { ContainerProps } from './Container.props'

export const Container = ({ variant='default', children, className, ...props }: ContainerProps): JSX.Element => {
    return (
        <div className={cn(styles[variant], className)} {...props}>
            {children}
        </div>
    )
}