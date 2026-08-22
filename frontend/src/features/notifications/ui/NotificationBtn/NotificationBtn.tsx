import { Bell } from 'lucide-react';
import type { JSX } from 'react';
import { cn } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import styles from './NotificationBtn.module.css';
import type { NotificationBtnProps } from './NotificationBtn.props';

export const NotificationBtn = ({ hasUnread=true, iconSize=40, className, ...props }: NotificationBtnProps): JSX.Element => {
    const bellSize = iconSize * 0.6
    
    return (
        <Button 
            variant="ghost-accent"
            size="icon" 
            iconSize={iconSize}
            className={cn(styles.bellBtn, className)} 
            aria-label="Уведомления"
            {...props}
        >
            <Bell size={bellSize} strokeWidth={1.75} />
            {hasUnread && <span className={styles.bellIndicator} />}
        </Button>
    );
};