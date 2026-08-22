import { Moon, Sun } from 'lucide-react'
import { type JSX } from 'react'
import { useTheme, useThemeActions } from '../../../store/theme/hooks'
import { Button } from '../../ui'
import type { ThemeToggleBtnProps } from './ThemeToggleBtn.props'



export const ThemeToggleBtn = ( { iconSize=40, className, ...props }: ThemeToggleBtnProps ): JSX.Element => {
    const theme = useTheme();
    const { toggleTheme } = useThemeActions();
    
    const themeIconSize = iconSize * 0.6;

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