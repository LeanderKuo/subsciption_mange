import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { UserProfile, UserProfileInput } from "../types/subscription";
import { ArrowBack } from "@mui/icons-material";
import { useLocale } from "../i18n/LocaleProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useToast } from "../hooks/use-toast";
import { useTheme } from "../theme/ThemeProvider";

export const UserSettings = () => {
  const navigate = useNavigate();
  const { t, locale, setLocale } = useLocale();
  const { toast } = useToast();
  const { theme, colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    defaultCurrency: "TWD",
  });
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmValue, setDeleteConfirmValue] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteConfirmationCode = "DELETE";

  const headerRight = (
    <>
      <ThemeSwitcher />
      <LanguageSwitcher value={locale} onChange={setLocale} variant={theme} />
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/dashboard")}
        sx={{ color: colors.text }}
      >
        {t("settings.back")}
      </Button>
    </>
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          navigate("/");
          return;
        }

        // Fetch user profile
        const { data, error: fetchError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (fetchError) {
          // Profile doesn't exist, create one
          const { data: newProfile, error: createError } = await supabase
            .from("user_profiles")
            .insert({
              id: user.id,
              email: user.email,
              default_currency: "TWD",
            })
            .select()
            .single();

          if (createError) {
            throw createError;
          }

          const profileData: UserProfile = {
            id: newProfile.id,
            email: newProfile.email,
            nickname: newProfile.nickname,
            defaultCurrency: newProfile.default_currency,
            createdAt: newProfile.created_at,
            updatedAt: newProfile.updated_at,
            deletedAt: newProfile.deleted_at,
          };

          setForm({
            email: profileData.email || "",
            nickname: profileData.nickname || "",
            defaultCurrency: profileData.defaultCurrency,
          });
        } else {
          const profileData: UserProfile = {
            id: data.id,
            email: data.email,
            nickname: data.nickname,
            defaultCurrency: data.default_currency,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            deletedAt: data.deleted_at,
          };

          if (profileData.deletedAt) {
            await supabase.auth.signOut();
            toast({
              title: t("settings.delete.successTitle"),
              description: t("settings.delete.successDescription"),
            });
            navigate("/");
            return;
          }

          setForm({
            email: profileData.email || "",
            nickname: profileData.nickname || "",
            defaultCurrency: profileData.defaultCurrency,
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(
          err instanceof Error ? err.message : t("settings.loadingError")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, t, toast]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error(t("auth.error.notAuthenticated"));
      }

      const updateData: UserProfileInput = {
        email: form.email.trim() || null,
        nickname: form.nickname.trim() || null,
        defaultCurrency: form.defaultCurrency,
      };

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          email: updateData.email,
          nickname: updateData.nickname,
          default_currency: updateData.defaultCurrency,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess(t("settings.updateSuccess"));
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err instanceof Error ? err.message : t("settings.updateError"));
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: t("header.logoutSuccess"),
        description: t("header.logoutSuccessDescription"),
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to sign out:", err);
      toast({
        title: t("header.logoutFailure"),
        description: t("header.logoutFailureDescription"),
        variant: "destructive",
      });
    }
  };

  const handlePasswordSubmit = async () => {
    setPasswordError(null);

    if (
      !passwordForm.current ||
      !passwordForm.newPassword ||
      !passwordForm.confirm
    ) {
      setPasswordError(t("auth.validation.fillAll"));
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirm) {
      setPasswordError(t("auth.validation.passwordMismatch"));
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError(t("auth.validation.passwordLength"));
      return;
    }

    setPasswordSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.email) {
        throw new Error(t("auth.error.notAuthenticated"));
      }

      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordForm.current,
      });

      if (reauthError) {
        setPasswordError(t("settings.password.error.invalidCurrent"));
        setPasswordSaving(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (updateError) {
        setPasswordError(
          updateError.message || t("settings.password.error.generic")
        );
      } else {
        toast({
          title: t("settings.password.successTitle"),
          description: t("settings.password.successDescription"),
        });
        setPasswordForm({ current: "", newPassword: "", confirm: "" });
      }
    } catch (err) {
      console.error("Failed to update password:", err);
      setPasswordError(
        err instanceof Error
          ? err.message
          : t("settings.password.error.generic")
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const closeDeleteDialog = () => {
    if (deleteLoading) return;
    setDeleteDialogOpen(false);
    setDeleteConfirmValue("");
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error(t("auth.error.notAuthenticated"));
      }

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          deleted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: t("settings.delete.successTitle"),
        description: t("settings.delete.successDescription"),
      });

      await supabase.auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete account:", err);
      toast({
        title: t("settings.delete.errorTitle"),
        description:
          err instanceof Error
            ? err.message
            : t("settings.delete.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmValue("");
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: colors.background,
        }}
      >
        <CircularProgress size={60} sx={{ color: colors.primary }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.3s ease",
      }}
    >
      <SiteHeader
        navLinks={[]}
        subtitle={t("settings.title")}
        rightSlot={headerRight}
        variant={theme}
      />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.surface,
              backdropFilter: "blur(20px)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: colors.text }}
                >
                  {t("settings.section.basic")}
                </Typography>

                {error && (
                  <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" onClose={() => setSuccess(null)}>
                    {success}
                  </Alert>
                )}

                <TextField
                  label={t("settings.email")}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  fullWidth
                  helperText={t("settings.email.helper")}
                />

                <TextField
                  label={t("settings.nickname")}
                  value={form.nickname}
                  onChange={(e) =>
                    setForm({ ...form, nickname: e.target.value })
                  }
                  fullWidth
                  helperText={t("settings.nickname.helper")}
                />

                <TextField
                  label={t("settings.defaultCurrency")}
                  select
                  value={form.defaultCurrency}
                  onChange={(e) =>
                    setForm({ ...form, defaultCurrency: e.target.value })
                  }
                  fullWidth
                  required
                  helperText={t("settings.defaultCurrency.helper")}
                >
                  <MenuItem value="TWD">{t("currency.TWD")}</MenuItem>
                  <MenuItem value="USD">{t("currency.USD")}</MenuItem>
                  <MenuItem value="EUR">{t("currency.EUR")}</MenuItem>
                  <MenuItem value="JPY">{t("currency.JPY")}</MenuItem>
                  <MenuItem value="GBP">{t("currency.GBP")}</MenuItem>
                </TextField>

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/dashboard")}
                    sx={{
                      color: colors.text,
                      borderColor: colors.border,
                      "&:hover": {
                        borderColor: colors.primary,
                        backgroundColor: colors.primaryLight,
                      },
                    }}
                  >
                    {t("settings.cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                      backgroundColor: colors.primary,
                      color: theme === "dark" ? "#000" : "#fff",
                      "&:hover": {
                        backgroundColor: colors.primaryHover,
                      },
                    }}
                  >
                    {saving ? t("settings.saving") : t("settings.save")}
                  </Button>
                </Stack>

                <Divider sx={{ my: 2, borderColor: colors.border }} />

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: colors.text }}
                >
                  {t("settings.section.security")}
                </Typography>

                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ color: colors.text }}
                  >
                    {t("settings.password.title")}
                  </Typography>
                  <TextField
                    type="password"
                    label={t("settings.password.current")}
                    value={passwordForm.current}
                    onChange={(e) => {
                      setPasswordForm((prev) => ({
                        ...prev,
                        current: e.target.value,
                      }));
                      setPasswordError(null);
                    }}
                    fullWidth
                  />
                  <TextField
                    type="password"
                    label={t("settings.password.new")}
                    value={passwordForm.newPassword}
                    onChange={(e) => {
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }));
                      setPasswordError(null);
                    }}
                    fullWidth
                  />
                  <TextField
                    type="password"
                    label={t("settings.password.confirm")}
                    value={passwordForm.confirm}
                    onChange={(e) => {
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirm: e.target.value,
                      }));
                      setPasswordError(null);
                    }}
                    fullWidth
                  />
                  {passwordError && (
                    <Alert
                      severity="error"
                      onClose={() => setPasswordError(null)}
                    >
                      {passwordError}
                    </Alert>
                  )}
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handlePasswordSubmit}
                      disabled={passwordSaving}
                      sx={{
                        minWidth: 180,
                        color: colors.text,
                        borderColor: colors.border,
                        "&:hover": {
                          borderColor: colors.primary,
                          color: colors.primary,
                          backgroundColor: colors.primaryLight,
                        },
                      }}
                    >
                      {passwordSaving
                        ? t("settings.saving")
                        : t("settings.password.submit")}
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.surface,
              backdropFilter: "blur(20px)",
              mt: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: colors.text }}
                >
                  {t("settings.section.account")}
                </Typography>

                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleSignOut}
                    sx={{
                      borderColor: colors.error,
                      color: colors.error,
                      "&:hover": {
                        borderColor: colors.error,
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(211, 47, 47, 0.1)"
                            : "#ffebee",
                      },
                    }}
                  >
                    {t("settings.signOut")}
                  </Button>
                </Box>

                <Divider sx={{ my: 1, borderColor: colors.border }} />

                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1, color: colors.text }}
                  >
                    {t("settings.delete.title")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: colors.textSecondary }}
                  >
                    {t("settings.delete.description")}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                    sx={{
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    {t("settings.delete.button")}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <SiteFooter />

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{t("settings.delete.dialog.title")}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("settings.delete.dialog.description")}
          </Typography>
          <TextField
            autoFocus
            fullWidth
            value={deleteConfirmValue}
            onChange={(e) => setDeleteConfirmValue(e.target.value)}
            label={t("settings.delete.dialog.placeholder")}
            disabled={deleteLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} disabled={deleteLoading}>
            {t("settings.delete.dialog.cancel")}
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="error"
            disabled={
              deleteLoading ||
              deleteConfirmValue.trim().toUpperCase() !== deleteConfirmationCode
            }
          >
            {deleteLoading
              ? t("settings.saving")
              : t("settings.delete.dialog.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserSettings;
