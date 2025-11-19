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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { differenceInDays, format } from 'date-fns';
import { useState, type DragEvent } from 'react';
import { Subscription, SubscriptionCategory } from '../types/subscription';
import { EditSubscriptionDialog } from './EditSubscriptionDialog';
import { useLocale } from '../i18n/LocaleProvider';
import { computeMonthlyCost, parseBillingCycle } from '../utils/billingUtils';

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
  priceDisplayMode?: 'original' | 'monthly';
}

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
  priceDisplayMode = 'original',
}: SubscriptionCardProps) => {
  const { t } = useLocale();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(subscription.id);
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const chipColor = categoryColor ?? '#6b7280';

  const renderStatusChip = () => {
    const days = differenceInDays(new Date(subscription.endDate), new Date());
    if (Number.isNaN(days)) return null;
    if (days < 0) {
      return (
        <Chip
          label={t('subscriptionCard.status.expired')}
          color="error"
          size="small"
          variant="outlined"
        />
      );
    }
    if (days <= 7) {
      return (
        <Chip
          label={t('subscriptionCard.status.expiringSoon')}
          color="warning"
          size="small"
          variant="outlined"
        />
      );
    }
    return (
      <Chip
        label={t('subscriptionCard.status.active')}
        color="success"
        size="small"
        variant="outlined"
      />
    );
  };

  const renderPrice = () => {
    if (priceDisplayMode === 'monthly') {
      const { billingPeriod, customDuration } = parseBillingCycle(subscription.cycle);
      const monthlyPrice = computeMonthlyCost(subscription.price, billingPeriod, customDuration, subscription.cycle);
      return `${subscription.currency} ${Math.round(monthlyPrice)} / ${t('billingCycle.month')}`;
    }
    return `${subscription.currency} ${subscription.price}`;
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: '2px solid #e5e7eb',
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
            {renderPrice()}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {format(new Date(subscription.startDate), 'yyyy/MM/dd')} -{' '}
            {format(new Date(subscription.endDate), 'yyyy/MM/dd')}
          </Typography>
          <Box mt={1}>{renderStatusChip()}</Box>
        </CardContent>
        <CardActions>
          <Tooltip title={t('common.edit')}>
            <span>
              <EditSubscriptionDialog
                subscription={subscription}
                onSave={onEdit}
                categories={categories}
              />
            </span>
          </Tooltip>
          <Tooltip title={t('common.delete')}>
            <IconButton color="error" onClick={handleDeleteClick} aria-label={t('common.delete')}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('deleteSubscription.confirmTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('deleteSubscription.confirmMessage', { name: subscription.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>{t('common.cancel')}</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
