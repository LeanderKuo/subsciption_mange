import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "../theme/ThemeProvider";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  onIconClick?: () => void;
  iconTooltip?: string;
  onClick?: () => void;
}

export const StatsCard = ({
  title,
  value,
  icon,
  description,
  onIconClick,
  iconTooltip,
  onClick,
}: StatsCardProps) => {
  const { colors, theme } = useTheme();

  const iconElement = onIconClick ? (
    <Tooltip title={iconTooltip || ""} arrow>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onIconClick();
        }}
        size="small"
        sx={{
          color: colors.primary,
          "&:hover": {
            backgroundColor: colors.primaryLight,
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Box sx={{ color: colors.primary }}>{icon}</Box>
  );

  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        borderRadius: 4,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(20px)",
        height: "100%",
        transition: "all 0.2s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              borderColor: colors.primary,
              transform: "translateY(-2px)",
              boxShadow:
                theme === "dark"
                  ? "0 8px 24px rgba(52, 178, 123, 0.15)"
                  : "0 8px 24px rgba(25, 118, 210, 0.15)",
            }
          : {},
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, fontWeight: 600 }}
          >
            {title}
          </Typography>
          {iconElement}
        </Box>
        <Typography variant="h4" fontWeight={700} sx={{ color: colors.text }}>
          {value}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, mt: 1 }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
