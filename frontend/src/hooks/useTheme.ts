import { useEffect, useState } from "react";
import type { Theme } from "../types/theme";



export interface UseThemeReturn {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('app-theme');
        
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme as Theme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}