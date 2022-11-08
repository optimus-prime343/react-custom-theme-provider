import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { DARK_THEME, LIGHT_THEME } from "./constants";
import { ThemeContext } from "./theme-context";
import { ThemeKey } from "./types";

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<ThemeKey>("theme", "dark");

  const themeData = useMemo(
    () => (theme === "dark" ? DARK_THEME : LIGHT_THEME),
    [theme]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const subscribe = useCallback(
    (callback: (currentTheme: ThemeKey) => void) => {
      callback(theme);
    },
    [theme]
  );

  const setBodyStyleProperty = useCallback(
    (property: string, value: string) => {
      document.body.style.setProperty(property, value);
    },
    []
  );

  const contextValue = useMemo(() => ({ theme, toggleTheme, subscribe }), [
    theme,
    toggleTheme,
    subscribe
  ]);

  useEffect(() => {
    setBodyStyleProperty("--bg-color", themeData.background);
    setBodyStyleProperty("--text-color", themeData.text);
  }, [themeData, setBodyStyleProperty]);
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
