import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { differenceInDays, format } from 'date-fns';
import type { DragEvent } from 'react';
import { Subscription, SubscriptionCategory } from '../types/subscription';
import { EditSubscriptionDialog } from './EditSubscriptionDialog';

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete: (id: number) => Promise<void> | void;
  onEdit: (subscription: Subscription) => Promise<void> | void;
  categories?: SubscriptionCategory[];
  categoryName?: string;
  categoryColor?: string;
  draggable?: boolean;
  isDragging?: boolean;
  onDragStart?: (subscriptionId: number, event: DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
}

const statusChip = (endDate: string) => {
  const days = differenceInDays(new Date(endDate), new Date());
  if (Number.isNaN(days)) return null;
  if (days < 0) {
    return <Chip label="逾期" color="error" size="small" variant="outlined" />;
  }
  if (days <= 7) {
    return <Chip label="即將到期" color="warning" size="small" variant="outlined" />;
  }
  return <Chip label="使用中" color="success" size="small" variant="outlined" />;
};

export const SubscriptionCard = ({
  subscription,
  onDelete,
  onEdit,
  categories,
  categoryName,
  categoryColor,
  draggable = false,
  isDragging = false,
  onDragStart,
  onDragEnd,
}: SubscriptionCardProps) => {
  const handleDelete = () => onDelete(subscription.id);
  const borderColor = categoryColor ?? '#e5e7eb';
  const chipColor = categoryColor ?? '#6b7280';

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: `2px solid ${borderColor}`,
        backgroundColor: '#fff',
        opacity: isDragging ? 0.6 : 1,
        cursor: draggable ? 'grab' : 'default',
      }}
      draggable={draggable}
      onDragStart={(event) => {
        if (!draggable) return;
        event.dataTransfer.setData('text/plain', String(subscription.id));
        event.dataTransfer.effectAllowed = 'move';
        onDragStart?.(subscription.id, event);
      }}
      onDragEnd={() => {
        if (!draggable) return;
        onDragEnd?.();
      }}
    >
      <CardContent>
        {categoryName && (
          <Chip
            label={categoryName}
            size="small"
            sx={{
              backgroundColor: chipColor,
              color: '#fff',
              fontWeight: 600,
              mb: 1.5,
            }}
          />
        )}
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={subscription.iconUrl ?? undefined}
            alt={subscription.brand}
            sx={{ width: 48, height: 48, mr: 2 }}
          >
            {subscription.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {subscription.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subscription.brand}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h5" fontWeight={700} gutterBottom>
          {`${subscription.currency} ${subscription.price}`}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {format(new Date(subscription.startDate), 'yyyy/MM/dd')} -{' '}
          {format(new Date(subscription.endDate), 'yyyy/MM/dd')}
        </Typography>
        <Box mt={1}>{statusChip(subscription.endDate)}</Box>
      </CardContent>
      <CardActions>
        <Tooltip title="編輯">
          <span>
            <EditSubscriptionDialog
              subscription={subscription}
              onSave={onEdit}
              categories={categories}
            />
          </span>
        </Tooltip>
        <Tooltip title="刪除">
          <IconButton color="error" onClick={handleDelete} aria-label="刪除">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};
