import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Tab,
  Tabs,
  Alert,
  Divider,
} from "@mui/material";
import {
  signIn,
  signUp,
  signInWithGoogle,
  signInWithApple,
} from "../services/supabaseService";
import { useToast } from "../hooks/use-toast";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onClose,
  onAuthSuccess,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    onClose();
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("請填寫所有欄位");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      toast({
        title: "登入成功",
        description: "歡迎回來！",
      });
      onAuthSuccess();
      handleClose();
    } catch (err: any) {
      setError(err.message || "登入失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("請填寫所有欄位");
      return;
    }

    if (password !== confirmPassword) {
      setError("密碼確認不匹配");
      return;
    }

    if (password.length < 6) {
      setError("密碼至少需要6個字符");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      toast({
        title: "註冊成功",
        description: "請檢查您的郵件以確認帳號",
      });
      setTabValue(0); // 切換到登入頁籤
    } catch (err: any) {
      setError(err.message || "註冊失敗");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight={600}>
          訂閱管理平台
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="auth tabs">
            <Tab label="登入" />
            <Tab label="註冊" />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <TabPanel value={tabValue} index={0}>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email-signin"
              label="電子郵件"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password-signin"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email-signup"
              label="電子郵件"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password-signup"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="至少6個字符"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="確認密碼"
              type="password"
              id="confirm-password-signup"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </TabPanel>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            或使用以下方式繼續
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  toast({
                    title: "重新導向中",
                    description: "正在前往 Google 登入...",
                  });
                } catch (err: any) {
                  setError(err.message || "Google 登入失敗");
                }
              }}
              sx={{
                minWidth: 120,
                color: "#4285f4",
                borderColor: "#4285f4",
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                  borderColor: "#4285f4",
                },
              }}>
              Google
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  await signInWithApple();
                  toast({
                    title: "重新導向中",
                    description: "正在前往 Apple 登入...",
                  });
                } catch (err: any) {
                  setError(err.message || "Apple 登入失敗");
                }
              }}
              sx={{
                minWidth: 120,
                color: "#000000",
                borderColor: "#000000",
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                  borderColor: "#000000",
                },
              }}>
              Apple
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} color="inherit">
          取消
        </Button>
        {tabValue === 0 ? (
          <Button
            onClick={handleSignIn}
            variant="contained"
            disabled={isLoading}>
            {isLoading ? "登入中..." : "登入"}
          </Button>
        ) : (
          <Button
            onClick={handleSignUp}
            variant="contained"
            disabled={isLoading}>
            {isLoading ? "註冊中..." : "註冊"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
