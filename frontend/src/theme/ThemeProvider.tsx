import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  Theme,
  ThemeColors,
  getThemeWithAccent,
  DEFAULT_ACCENT_COLORS,
} from "./themeColors";

interface AccentColors {
  dark: string;
  light: string;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
  accentColors: AccentColors;
  setAccentColors: (colors: AccentColors) => void;
  resetAccentColors: () => void;
}

const THEME_STORAGE_KEY = "subscription-manager.theme";
const ACCENT_COLORS_STORAGE_KEY = "subscription-manager.accent-colors";

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

const loadAccentColors = (): AccentColors => {
  if (typeof window === "undefined") {
    return { ...DEFAULT_ACCENT_COLORS };
  }

  try {
    const stored = window.localStorage.getItem(ACCENT_COLORS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        dark: parsed.dark || DEFAULT_ACCENT_COLORS.dark,
        light: parsed.light || DEFAULT_ACCENT_COLORS.light,
      };
    }
  } catch {
    // Ignore parse errors
  }
  return { ...DEFAULT_ACCENT_COLORS };
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(detectInitialTheme);
  const [accentColors, setAccentColorsState] =
    useState<AccentColors>(loadAccentColors);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Persist theme to localStorage
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Apply theme class to body
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);

    // Update CSS custom properties
    const currentAccent =
      theme === "dark" ? accentColors.dark : accentColors.light;
    const colors = getThemeWithAccent(theme, currentAccent);
    const root = document.documentElement;
    root.style.setProperty("--bg-color", colors.background);
    root.style.setProperty("--text-color", colors.text);
    root.style.setProperty("--primary-color", colors.primary);
  }, [theme, accentColors]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      ACCENT_COLORS_STORAGE_KEY,
      JSON.stringify(accentColors)
    );
  }, [accentColors]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setAccentColors = useCallback((colors: AccentColors) => {
    setAccentColorsState(colors);
  }, []);

  const resetAccentColors = useCallback(() => {
    setAccentColorsState({ ...DEFAULT_ACCENT_COLORS });
  }, []);

  const colors = useMemo(() => {
    const currentAccent =
      theme === "dark" ? accentColors.dark : accentColors.light;
    return getThemeWithAccent(theme, currentAccent);
  }, [theme, accentColors]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      colors,
      accentColors,
      setAccentColors,
      resetAccentColors,
    }),
    [theme, colors, accentColors, setAccentColors, resetAccentColors]
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
export { DEFAULT_ACCENT_COLORS };
