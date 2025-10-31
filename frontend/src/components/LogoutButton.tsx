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

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
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
        title: "登出成功",
        description: "感謝使用訂閱管理平台",
      });
      onLogout();
    } catch (error: any) {
      toast({
        title: "登出失敗",
        description: error.message || "請稍後再試一次。",
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
        {user?.email || "用戶"}
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
          <ListItemText>{isLoading ? "登出中..." : "登出"}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
