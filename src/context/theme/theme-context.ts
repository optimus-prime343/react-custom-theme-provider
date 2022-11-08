import { createContext, useContext } from "react";
import type { CSSProperties } from "react";
import { Theme, ThemeKey } from "./types";
import { DARK_THEME, LIGHT_THEME } from "./constants";

export interface IThemeContext {
  theme: ThemeKey;
  subscribe: (callback: (currentTheme: ThemeKey) => void) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const useThemedStyles = <TReturnPayload>(
  styles: (theme: Theme) => Record<keyof TReturnPayload, CSSProperties>
) => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? DARK_THEME : LIGHT_THEME;
  return { style: styles(currentTheme) };
};
