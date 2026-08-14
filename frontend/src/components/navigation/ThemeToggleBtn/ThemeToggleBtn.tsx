import { Moon, Sun } from 'lucide-react'
import { type JSX } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { Button } from '../../ui'
import type { ThemeToggleBtnProps } from './ThemeToggleBtn.props'


export const ThemeToggleBtn = ( { iconSize=40, className, ...props }: ThemeToggleBtnProps ): JSX.Element => {
    const { theme, toggleTheme } = useTheme();
    const themeIconSize = iconSize * 0.6
    
    return (
        <Button 
            variant="ghost-accent" 
            size="icon"
            iconSize={iconSize} 
            onClick={toggleTheme} 
            aria-label="Сменить тему"
            className={className}
            {...props}
        >
            {theme === 'dark' ? <Sun size={themeIconSize} /> : <Moon size={themeIconSize} />}
        </Button>
    )
}