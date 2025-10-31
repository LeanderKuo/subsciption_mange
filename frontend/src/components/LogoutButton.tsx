import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, getCurrentUser } from "../services/supabaseService";
import { useToast } from "../hooks/use-toast";
import { useLocale } from "../i18n/LocaleProvider";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLocale();
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    handleClose();

    try {
      await signOut();
      toast({
        title: t("header.logoutSuccess"),
        description: t("header.logoutSuccessDescription"),
      });
      onLogout();
    } catch (error: any) {
      toast({
        title: t("header.logoutFailure"),
        description: error.message || t("notifications.genericError"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<PersonIcon />}
        variant="outlined"
        size="small"
        sx={{
          borderColor: "rgba(255, 255, 255, 0.23)",
          color: "white",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.5)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        }}>
        {user?.email || t("auth.user.fallback")}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={handleLogout} disabled={isLoading}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {isLoading ? t("auth.actions.signOutLoading") : t("header.menu.logout")}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
