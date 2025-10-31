import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card elevation={0} sx={{ borderRadius: 2, border: '2px solid #000', backgroundColor: '#fff' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>
          {title}
        </Typography>
        <Box sx={{ color: '#000' }}>{icon}</Box>
      </Box>
      <Typography variant="h4" fontWeight={700} sx={{ color: '#000' }}>
        {value}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: '#666' }}>
          {description}
        </Typography>
      )}
    </CardContent>
  </Card>
);
