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
}

export const StatsCard = ({
  title,
  value,
  icon,
  description,
  onIconClick,
  iconTooltip,
}: StatsCardProps) => {
  const { colors } = useTheme();

  const iconElement = onIconClick ? (
    <Tooltip title={iconTooltip || ""} arrow>
      <IconButton
        onClick={onIconClick}
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
      sx={{
        borderRadius: 4,
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(20px)",
        height: "100%",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
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
