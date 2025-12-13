/**
 * Theme color tokens for dark and light themes.
 */

export type Theme = "dark" | "light";

export interface ThemeColors {
  // Backgrounds
  background: string;
  surface: string;
  surfaceHover: string;

  // Borders
  border: string;
  borderHover: string;

  // Text
  text: string;
  textSecondary: string;

  // Primary accent
  primary: string;
  primaryHover: string;
  primaryLight: string;

  // Status colors
  error: string;
  warning: string;
  success: string;

  // Card specific
  cardBackground: string;
  cardBorder: string;

  // Header/Footer
  headerBackground: string;
  footerBackground: string;
}

export const themeColors: Record<Theme, ThemeColors> = {
  dark: {
    // Backgrounds
    background: "#000000",
    surface: "rgba(255, 255, 255, 0.03)",
    surfaceHover: "rgba(255, 255, 255, 0.08)",

    // Borders
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(255, 255, 255, 0.2)",

    // Text
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.7)",

    // Primary accent - Green
    primary: "#34b27b",
    primaryHover: "#2d9969",
    primaryLight: "rgba(52, 178, 123, 0.1)",

    // Status colors
    error: "#d32f2f",
    warning: "#ff9800",
    success: "#4caf50",

    // Card specific
    cardBackground: "rgba(255, 255, 255, 0.03)",
    cardBorder: "rgba(255, 255, 255, 0.1)",

    // Header/Footer
    headerBackground: "#000000",
    footerBackground: "#000000",
  },

  light: {
    // Backgrounds
    background: "#f5f5f5",
    surface: "#ffffff",
    surfaceHover: "#f0f0f0",

    // Borders
    border: "#e0e0e0",
    borderHover: "#bdbdbd",

    // Text
    text: "#212121",
    textSecondary: "#666666",

    // Primary accent - Google Blue
    primary: "#1976d2",
    primaryHover: "#1565c0",
    primaryLight: "rgba(25, 118, 210, 0.1)",

    // Status colors
    error: "#d32f2f",
    warning: "#f57c00",
    success: "#388e3c",

    // Card specific
    cardBackground: "#ffffff",
    cardBorder: "#e0e0e0",

    // Header/Footer
    headerBackground: "#ffffff",
    footerBackground: "#fafafa",
  },
};

/**
 * Get contrasting text color based on background brightness.
 */
export const getTextColorForBackground = (
  bgColor: string,
  theme: Theme
): string => {
  // Simple heuristic: if background starts with #f or #e or #d, it's light
  const isLightBg =
    bgColor.match(/^#[f|e|d|c|b|a|9]/i) || bgColor.includes("255");
  return isLightBg ? themeColors[theme].text : "#ffffff";
};
