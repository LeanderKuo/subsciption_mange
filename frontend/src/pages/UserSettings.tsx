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
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { ArrowBack } from "@mui/icons-material";
import { useLocale } from "../i18n/LocaleProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useToast } from "../hooks/use-toast";
import { useTheme, DEFAULT_ACCENT_COLORS } from "../theme/ThemeProvider";

export const UserSettings = () => {
  const navigate = useNavigate();
  const { t, locale, setLocale } = useLocale();
  const { toast } = useToast();
  const {
    theme,
    colors,
    accentColors,
    setAccentColors,
    resetAccentColors,
    toggleTheme,
  } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    defaultCurrency: "TWD",
    darkAccentColor: DEFAULT_ACCENT_COLORS.dark as string,
    lightAccentColor: DEFAULT_ACCENT_COLORS.light as string,
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

  // 行動版快捷操作（直接顯示在 Header）
  const mobileQuickActions = (
    <>
      <ThemeSwitcher />
      <LanguageSwitcher value={locale} onChange={setLocale} variant={theme} />
    </>
  );

  // Drawer 內的條列式選單（返回主頁放在最上面）
  const drawerMenuItems = [
    {
      icon: <HomeIcon />,
      label: t("settings.backToHome"),
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />,
      label: t("header.theme.toggle"),
      onClick: toggleTheme,
    },
    {
      icon: <LanguageIcon />,
      label: t("header.language"),
      customContent: (
        <LanguageSwitcher value={locale} onChange={setLocale} variant={theme} />
      ),
    },
  ];

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
            darkAccentColor:
              newProfile.dark_accent_color || DEFAULT_ACCENT_COLORS.dark,
            lightAccentColor:
              newProfile.light_accent_color || DEFAULT_ACCENT_COLORS.light,
            createdAt: newProfile.created_at,
            updatedAt: newProfile.updated_at,
            deletedAt: newProfile.deleted_at,
          };

          setForm({
            email: profileData.email || "",
            nickname: profileData.nickname || "",
            defaultCurrency: profileData.defaultCurrency,
            darkAccentColor: profileData.darkAccentColor,
            lightAccentColor: profileData.lightAccentColor,
          });

          // Apply accent colors from profile
          setAccentColors({
            dark: profileData.darkAccentColor,
            light: profileData.lightAccentColor,
          });
        } else {
          const profileData: UserProfile = {
            id: data.id,
            email: data.email,
            nickname: data.nickname,
            defaultCurrency: data.default_currency,
            darkAccentColor:
              data.dark_accent_color || DEFAULT_ACCENT_COLORS.dark,
            lightAccentColor:
              data.light_accent_color || DEFAULT_ACCENT_COLORS.light,
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
            darkAccentColor: profileData.darkAccentColor,
            lightAccentColor: profileData.lightAccentColor,
          });

          // Apply accent colors from profile
          setAccentColors({
            dark: profileData.darkAccentColor,
            light: profileData.lightAccentColor,
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
        darkAccentColor: form.darkAccentColor,
        lightAccentColor: form.lightAccentColor,
      };

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          email: updateData.email,
          nickname: updateData.nickname,
          default_currency: updateData.defaultCurrency,
          dark_accent_color: updateData.darkAccentColor,
          light_accent_color: updateData.lightAccentColor,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        throw updateError;
      }

      // Apply the accent colors immediately
      setAccentColors({
        dark: form.darkAccentColor,
        light: form.lightAccentColor,
      });

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
        mobileQuickActions={mobileQuickActions}
        drawerMenuItems={drawerMenuItems}
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

                <Divider sx={{ my: 2, borderColor: colors.border }} />

                {/* Theme Colors Section */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: colors.text }}
                >
                  {t("settings.section.themeColors")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.textSecondary, mb: 2 }}
                >
                  {t("settings.themeColors.description")}
                </Typography>

                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        backgroundColor: form.darkAccentColor,
                        border: `2px solid ${colors.border}`,
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <input
                        type="color"
                        value={form.darkAccentColor}
                        onChange={(e) =>
                          setForm({ ...form, darkAccentColor: e.target.value })
                        }
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        sx={{ color: colors.text }}
                      >
                        {t("settings.themeColors.darkAccent")}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: colors.textSecondary }}
                      >
                        {form.darkAccentColor}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        backgroundColor: form.lightAccentColor,
                        border: `2px solid ${colors.border}`,
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <input
                        type="color"
                        value={form.lightAccentColor}
                        onChange={(e) =>
                          setForm({ ...form, lightAccentColor: e.target.value })
                        }
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        fontWeight={500}
                        sx={{ color: colors.text }}
                      >
                        {t("settings.themeColors.lightAccent")}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: colors.textSecondary }}
                      >
                        {form.lightAccentColor}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      setForm({
                        ...form,
                        darkAccentColor: DEFAULT_ACCENT_COLORS.dark,
                        lightAccentColor: DEFAULT_ACCENT_COLORS.light,
                      });
                    }}
                    sx={{
                      alignSelf: "flex-start",
                      color: colors.textSecondary,
                      "&:hover": {
                        color: colors.text,
                        backgroundColor: colors.surfaceHover,
                      },
                    }}
                  >
                    {t("settings.themeColors.reset")}
                  </Button>
                </Stack>

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
