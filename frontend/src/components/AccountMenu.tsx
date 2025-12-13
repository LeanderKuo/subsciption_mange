import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { useTheme } from "../theme/ThemeProvider";

type AccountMenuProps = {
  email: string;
  onSettings: () => void;
  onLogout: () => void;
};

export const AccountMenu = ({
  email,
  onSettings,
  onLogout,
}: AccountMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useLocale();
  const { theme, colors } = useTheme();
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
          color: colors.text,
          "&:hover": { backgroundColor: colors.primaryLight },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: colors.primary,
            color: theme === "dark" ? "#000" : "#fff",
            fontSize: "0.875rem",
            fontWeight: 700,
          }}
        >
          {email.charAt(0).toUpperCase() || "S"}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            border: `1px solid ${colors.border}`,
            borderRadius: 2,
            minWidth: 200,
            backgroundColor: colors.surface,
          },
        }}
      >
        <Box
          sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${colors.border}` }}
        >
          <Typography
            variant="body2"
            sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}
          >
            {t("header.loggedInAs")}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: colors.text }}
          >
            {email}
          </Typography>
        </Box>
        <MenuItem onClick={handleSettings} sx={{ color: colors.text }}>
          {t("header.menu.settings")}
        </MenuItem>
        <MenuItem onClick={handleSignOut} sx={{ color: colors.error }}>
          {t("header.menu.logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
