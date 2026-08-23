export type Theme = 'light' | 'dark';

export interface ThemeState {
    theme: Theme;
}

export interface ThemeActions {
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export interface ThemeStore extends ThemeState {
    actions: ThemeActions;
}