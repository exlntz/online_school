import { Moon, Sun } from 'lucide-react'
import { type JSX } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { Button } from '../../ui'
import type { ThemeToggleBtnProps } from './ThemeToggleBtn.props'


export const ThemeToggleBtn = ( { className, ...props }: ThemeToggleBtnProps ): JSX.Element => {
    const { theme, toggleTheme } = useTheme();
    
    return (
        <Button 
            variant="ghost-accent" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Сменить тему"
            className={className}
            {...props}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
    )
}