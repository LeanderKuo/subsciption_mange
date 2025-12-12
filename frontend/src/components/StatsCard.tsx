import { Card, CardContent, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export const StatsCard = ({
  title,
  value,
  icon,
  description,
}: StatsCardProps) => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 4,
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      height: "100%",
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
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Box sx={{ color: "primary.main" }}>{icon}</Box>
      </Box>
      <Typography variant="h4" fontWeight={700}>
        {value}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {description}
        </Typography>
      )}
    </CardContent>
  </Card>
);
