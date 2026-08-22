import { create } from 'zustand';
import { devtools, persist, type DevtoolsOptions, type PersistOptions } from 'zustand/middleware';
import type { Theme, ThemeState, ThemeStore } from './types';


const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
};

const defaultTheme: ThemeState = {
    theme: getSystemTheme(),
};

const devToolsOptions: DevtoolsOptions = {
    store: 'theme-storage',
    enabled: import.meta.env.DEV,
};

const persistOptions: PersistOptions<ThemeStore, Omit<ThemeStore, 'actions'>> = {
    name: 'theme-storage',
    partialize: (state) => {
        const { actions: _, ...rest } = state;
        return rest;
    },
    onRehydrateStorage: () => (state) => {
        if (state) {
            document.documentElement.setAttribute('data-theme', state.theme);
        }
    },
};

export const useThemeStore = create<ThemeStore>()(
    devtools(
        persist(
            (set, get) => ({
                ...defaultTheme,

                actions: {
                    setTheme: (newTheme: Theme) => {
                        document.documentElement.setAttribute('data-theme', newTheme);
                        set({ theme: newTheme }, false, { type: 'setTheme', payload: newTheme });
                    },
                    toggleTheme: () => {
                        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
                        document.documentElement.setAttribute('data-theme', nextTheme);
                        set({ theme: nextTheme }, false, { type: 'toggleTheme', payload: nextTheme });
                    },
                },
            }),
            persistOptions
        ),
        devToolsOptions
    )
);