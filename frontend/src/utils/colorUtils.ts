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
