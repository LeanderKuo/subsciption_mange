/**
 * Color utility functions for dynamic text color based on background brightness.
 */

/**
 * Calculate the relative luminance of a color.
 * Uses the WCAG formula for luminance.
 * @param hex - Hex color string (e.g., "#ffffff" or "#fff")
 * @returns Luminance value between 0 (darkest) and 1 (lightest)
 */
export const getLuminance = (hex: string): number => {
  // Remove # if present
  const cleanHex = hex.replace("#", "");

  // Expand shorthand (e.g., "fff" -> "ffffff")
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((c) => c + c)
          .join("")
      : cleanHex;

  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

/**
 * Determine whether to use dark or light text based on background color.
 * @param backgroundColor - Hex color string of the background
 * @param lightColor - Color to use on dark backgrounds (default: "#fff")
 * @param darkColor - Color to use on light backgrounds (default: "#000")
 * @returns The appropriate text color
 */
export const getContrastTextColor = (
  backgroundColor: string,
  lightColor: string = "#fff",
  darkColor: string = "#000"
): string => {
  const luminance = getLuminance(backgroundColor);
  // Use a threshold of 0.5 - if background is bright, use dark text
  return luminance > 0.5 ? darkColor : lightColor;
};

/**
 * Check if a color is considered "light" (bright).
 * @param hex - Hex color string
 * @returns true if the color is light/bright
 */
export const isLightColor = (hex: string): boolean => {
  return getLuminance(hex) > 0.5;
};

/**
 * Check if a color is considered "dark" (dim).
 * @param hex - Hex color string
 * @param threshold - Luminance threshold (default: 0.2 for dark colors)
 * @returns true if the color is very dark
 */
export const isDarkColor = (hex: string, threshold: number = 0.2): boolean => {
  return getLuminance(hex) < threshold;
};

/**
 * Check if a color is considered "very light" (close to white).
 * @param hex - Hex color string
 * @param threshold - Luminance threshold (default: 0.85 for very light colors)
 * @returns true if the color is very light
 */
export const isVeryLightColor = (
  hex: string,
  threshold: number = 0.85
): boolean => {
  return getLuminance(hex) > threshold;
};

/**
 * Get border style for a chip based on the category color and current theme.
 * Very dark colors get a visible border in dark mode.
 * Very light colors get a visible border in light mode.
 * @param chipColor - The chip's background color
 * @param theme - Current theme ("dark" | "light")
 * @returns Border CSS string
 */
export const getChipBorderStyle = (
  chipColor: string,
  theme: "dark" | "light"
): string => {
  if (theme === "dark" && isDarkColor(chipColor)) {
    return "2px solid rgba(255, 255, 255, 0.7)";
  }
  if (theme === "light" && isVeryLightColor(chipColor)) {
    return "2px solid rgba(0, 0, 0, 0.3)";
  }
  return "none";
};

/**
 * Get box shadow for a chip based on the category color and current theme.
 * Provides additional visibility for extreme colors.
 * @param chipColor - The chip's background color
 * @param theme - Current theme ("dark" | "light")
 * @returns Box shadow CSS string
 */
export const getChipBoxShadow = (
  chipColor: string,
  theme: "dark" | "light"
): string => {
  if (theme === "dark" && isDarkColor(chipColor)) {
    return "0 0 6px rgba(255, 255, 255, 0.4)";
  }
  if (theme === "light" && isVeryLightColor(chipColor)) {
    return "0 0 6px rgba(0, 0, 0, 0.2)";
  }
  return "none";
};
