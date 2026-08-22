import type { ThemeStore } from "./types";

export const themeSelector = (state: ThemeStore) => state.theme;

export const themeActionsSelector = (state: ThemeStore) => state.actions;