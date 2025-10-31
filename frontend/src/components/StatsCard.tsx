import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid #eee' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        {icon}
      </Box>
      <Typography variant="h4" fontWeight={700}>
        {value}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </CardContent>
  </Card>
);
