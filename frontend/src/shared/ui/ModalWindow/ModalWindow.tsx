import { X } from 'lucide-react';
import { useRef, type JSX } from 'react';
import { cn, useClickOutside } from '../../lib';
import { Button } from '../Button/Button';
import styles from './ModalWindow.module.css';
import type { ModalWindowProps } from './ModalWindow.props';

export const ModalWindow = ({ isOpen, onClose, title, children, className, ...props }: ModalWindowProps): JSX.Element | null => {
    const contentRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        ref: contentRef,
        handler: onClose,
        enabled: isOpen
    });

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true">
            <div className={cn(styles.content, className)} ref={contentRef} {...props}>
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    <Button
                        type="button"
                        variant='ghost-secondary'
                        size='icon'
                        onClick={onClose}
                        aria-label="Закрыть"
                        
                    >
                        <X size={16} />
                    </Button>
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </div>
    );
};