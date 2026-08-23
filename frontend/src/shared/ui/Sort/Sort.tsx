import { ArrowUpDown } from 'lucide-react';
import { type JSX } from 'react';
import { Button } from '..';
import { cn } from '../../lib/cn';
import styles from './Sort.module.css';
import type { SortProps } from './Sort.props';


export const Sort = ( { className, sort, setSort, ...props }: SortProps ): JSX.Element => {
    const isActive = sort === 'Name';

    return (
        <div className={cn(styles.sort, className)} {...props}> 
            <Button
                type="button"
                id="name"
                onClick={() => setSort(isActive ? 'Initial' : 'Name')}
                variant="ghost-secondary"
                size="s"
                aria-selected={isActive}
                aria-labelledby="sort name"
            >
                <ArrowUpDown size={14} />
                А–Я
            </Button>
        </div>
    )
}
