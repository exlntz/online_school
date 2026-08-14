import { SearchIcon } from 'lucide-react';
import { useState, type ChangeEvent, type JSX, type SyntheticEvent } from 'react';
import { Button, Input } from '..';
import { cn } from '../../../utils/cn';
import styles from './Search.module.css';
import type { SearchProps } from './Search.props';


export const Search = ( { className, onSearch, placeholder='Поиск...', iconPosition='right', ...props}: SearchProps ): JSX.Element => {
    const [ search, setSearch ] = useState<string>('');

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value)
        onSearch(value)
    }

    const isLeft = iconPosition === 'left';

    return (
        <form className={cn(styles.search, className)} onSubmit={handleSubmit} {...props} role="search"> 
            <Input 
                className={cn(
                    styles.input,
                    isLeft ? styles.inputLeft : styles.inputRight
                )}
                placeholder={placeholder}
                value={search}
                onChange={handleChange}
            />
            <Button
                type="submit"
                className={cn(
                    styles.button,
                    isLeft ? styles.buttonLeft : styles.buttonRight
                )}
                variant="ghost-secondary"
                size="icon"
                noBg
                aria-label="Искать"
            >
                <SearchIcon size={16} />
            </Button>
        </form>
    )
}