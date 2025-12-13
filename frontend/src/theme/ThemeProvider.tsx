import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Theme, ThemeColors, themeColors } from "./themeColors";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const THEME_STORAGE_KEY = "subscription-manager.theme";

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

const detectInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "dark";
  }

  // Check localStorage first
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  // Check system preference
  if (window.matchMedia?.("(prefers-color-scheme: light)")?.matches) {
    return "light";
  }

  // Default to dark
  return "dark";
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(detectInitialTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Persist to localStorage
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Apply theme class to body
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);

    // Update CSS custom properties
    const colors = themeColors[theme];
    const root = document.documentElement;
    root.style.setProperty("--bg-color", colors.background);
    root.style.setProperty("--text-color", colors.text);
    root.style.setProperty("--primary-color", colors.primary);
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = useMemo(() => themeColors[theme], [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      colors,
    }),
    [theme, colors]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export type { Theme, ThemeColors };
