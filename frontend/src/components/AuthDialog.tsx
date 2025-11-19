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
import { useLocale } from "../i18n/LocaleProvider";

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
  const { t } = useLocale();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
  };

  const handleClose = (event?: {}, reason?: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick") return;
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    onClose();
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setError(t("auth.validation.fillAll"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      toast({
        title: t("auth.signIn.successTitle"),
        description: t("auth.signIn.successDescription"),
      });
      onAuthSuccess();
      handleClose();
    } catch (err: any) {
      setError(err.message || t("auth.signIn.error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError(t("auth.validation.fillAll"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("auth.validation.passwordMismatch"));
      return;
    }

    if (password.length < 6) {
      setError(t("auth.validation.passwordLength"));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      toast({
        title: t("auth.signUp.successTitle"),
        description: t("auth.signUp.successDescription"),
      });
      setTabValue(0); // Switch back to sign-in tab
    } catch (err: any) {
      setError(err.message || t("auth.signUp.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight={600}>
          {t("auth.dialog.title")}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="auth tabs">
            <Tab label={t("auth.tabs.signIn")} />
            <Tab label={t("auth.tabs.signUp")} />
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
              label={t("auth.fields.email")}
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
              label={t("auth.fields.password")}
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
              label={t("auth.fields.email")}
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
              label={t("auth.fields.password")}
              type="password"
              id="password-signup"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={t("auth.validation.passwordLength")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label={t("auth.fields.confirmPassword")}
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
            {t("auth.oauth.orContinue")}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  toast({
                    title: t("auth.oauth.redirectingTitle"),
                    description: t("auth.oauth.redirectingGoogle"),
                  });
                } catch (err: any) {
                  setError(err.message || t("auth.oauth.googleError"));
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
              {t("auth.actions.google")}
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  await signInWithApple();
                  toast({
                    title: t("auth.oauth.redirectingTitle"),
                    description: t("auth.oauth.redirectingApple"),
                  });
                } catch (err: any) {
                  setError(err.message || t("auth.oauth.appleError"));
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
              {t("auth.actions.apple")}
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={() => handleClose({}, "escapeKeyDown")} color="inherit">
          {t("auth.actions.cancel")}
        </Button>
        {tabValue === 0 ? (
          <Button
            onClick={handleSignIn}
            variant="contained"
            disabled={isLoading}>
            {isLoading ? t("auth.actions.signInLoading") : t("auth.actions.signIn")}
          </Button>
        ) : (
          <Button
            onClick={handleSignUp}
            variant="contained"
            disabled={isLoading}>
            {isLoading ? t("auth.actions.signUpLoading") : t("auth.actions.signUp")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
