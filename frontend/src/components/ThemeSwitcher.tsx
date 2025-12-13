import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../theme/ThemeProvider";
import { useLocale } from "../i18n/LocaleProvider";

interface ThemeSwitcherProps {
  size?: "small" | "medium" | "large";
}

export const ThemeSwitcher = ({ size = "medium" }: ThemeSwitcherProps) => {
  const { theme, toggleTheme, colors } = useTheme();
  const { t } = useLocale();

  const isDark = theme === "dark";
  const label = isDark ? t("header.theme.light") : t("header.theme.dark");

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggleTheme}
        size={size}
        aria-label={label}
        sx={{
          color: colors.text,
          backgroundColor: colors.surfaceHover,
          "&:hover": {
            backgroundColor: colors.primaryLight,
            color: colors.primary,
          },
        }}
      >
        {isDark ? (
          <LightModeIcon fontSize={size} />
        ) : (
          <DarkModeIcon fontSize={size} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
