import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLocale } from '../i18n/LocaleProvider';

type AccountMenuProps = {
  email: string;
  onSettings: () => void;
  onLogout: () => void;
};

export const AccountMenu = ({ email, onSettings, onLogout }: AccountMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useLocale();
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleClose();
    onSettings();
  };

  const handleSignOut = () => {
    handleClose();
    onLogout();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: '#fff',
            color: '#000',
            fontSize: '0.875rem',
            fontWeight: 700,
          }}
        >
          {email.charAt(0).toUpperCase() || 'S'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            border: '2px solid #000',
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem' }}>
            {t('header.loggedInAs')}
          </Typography>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#000' }}>
            {email}
          </Typography>
        </Box>
        <MenuItem onClick={handleSettings}>{t('header.menu.settings')}</MenuItem>
        <MenuItem onClick={handleSignOut} sx={{ color: '#d32f2f' }}>
          {t('header.menu.logout')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
