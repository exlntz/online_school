import { ChevronDown } from 'lucide-react';
import { useRef, useState, type JSX } from 'react';
import { useSubject, useSubjectActions } from '../..';
import { SUBJECTS } from '../../../../data/profile.data';
import { cn, useClickOutside } from '../../../../shared/lib';
import styles from './SubjectSelector.module.css';
import type { SubjectSelectorProps } from './SubjectSelector.props';


export const SubjectSelector = ({ className, ...props }: SubjectSelectorProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);

    const selectedId = useSubject()
    const { setSubject } = useSubjectActions()

    const selectedSubject = SUBJECTS.find((s) => s.id === selectedId) ?? SUBJECTS[0];
    const SelectedIcon = selectedSubject.icon;

    useClickOutside({
        ref: selectorRef,
        handler: () => setIsOpen(false),
        enabled: isOpen,
    });

    return (
        <div className={cn(styles.wrapper, className)} ref={selectorRef} {...props}>
            {isOpen && (
                <div className={styles.dropdown} role="listbox">
                    {SUBJECTS.map((subject) => {
                        const Icon = subject.icon;
                        const isActive = subject.id === selectedId;
                        
                        return (
                            <button
                                key={subject.id}
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                onClick={() => {
                                    setSubject(subject.id);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    styles.dropdownItem, 
                                    isActive && styles.dropdownItemActive
                                )}
                            >
                                <Icon size={16} />
                                {subject.label}
                            </button>
                        );
                    })}
                </div>
            )}

            <button 
                type="button" 
                className={styles.subjectBox} 
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <div className={styles.subjectIcon}>
                    <SelectedIcon size={18} />
                </div>
                <div className={styles.subjectText}>
                    <p className={styles.subjectLabel}>Предмет</p>
                    <p className={styles.subjectValue}>{selectedSubject.label}</p>
                </div>
                
                <ChevronDown 
                    size={16} 
                    className={cn(styles.chevron, isOpen && styles.chevronOpen)} 
                />
            </button>
        </div>
    );
};