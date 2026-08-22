import { themeActionsSelector, themeSelector } from "./selectors";
import { useThemeStore } from "./themeStore";
import type { ThemeStore } from "./types";

export const useTheme = (): ThemeStore['theme'] => 
    useThemeStore(themeSelector);

export const useThemeActions = (): ThemeStore['actions'] => 
    useThemeStore(themeActionsSelector);