import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./services/supabaseClient";
import IndexPage from "./pages/Index";
import NotFoundPage from "./pages/NotFound";
import LandingPage from "./pages/Landing";
import UserSettings from "./pages/UserSettings";
import { ToastProvider } from "./components/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { LocaleProvider } from "./i18n/LocaleProvider";
import {
  ThemeProvider,
  useTheme,
  Theme,
  ThemeColors,
} from "./theme/ThemeProvider";

const queryClient = new QueryClient();

// Create MUI theme based on our custom theme colors
const createAppTheme = (mode: Theme, colors: ThemeColors) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        contrastText: mode === "dark" ? "#000000" : "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#ffffff" : "#666666",
      },
      background: {
        default: colors.background,
        paper: mode === "dark" ? "#0a0a0a" : "#ffffff",
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
    },
    typography: {
      fontFamily:
        '"Inter", "Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightBold: 700,
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      button: { fontWeight: 600, textTransform: "none" },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 24px",
          },
          contained: {
            backgroundColor: colors.primary,
            color: mode === "dark" ? "#000000" : "#ffffff",
            boxShadow: `0 3px 5px 2px ${colors.primary}30`,
            "&:hover": {
              backgroundColor: colors.primaryHover,
              boxShadow: `0 3px 5px 2px ${colors.primary}50`,
            },
          },
          outlined: {
            borderColor: colors.border,
            color: colors.text,
            "&:hover": {
              borderColor: colors.primary,
              backgroundColor: colors.primaryLight,
            },
          },
          text: {
            color: colors.text,
            "&:hover": {
              color: colors.primary,
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            background: colors.cardBackground,
            backdropFilter: "blur(10px)",
            border: `1px solid ${colors.cardBorder}`,
            boxShadow:
              mode === "dark" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition:
              "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              borderColor: `${colors.primary}80`,
              boxShadow: `0 10px 40px -10px ${colors.primary}30`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background:
              mode === "dark"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${colors.border}`,
            boxShadow: "none",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "16px",
            border: `1px solid ${colors.border}`,
            background: mode === "dark" ? "#0a0a0a" : "#ffffff",
          },
        },
      },
    },
  });

// Inner app component that uses theme context
const ThemedApp = ({ user }: { user: User | null }) => {
  const { theme, colors } = useTheme();
  const muiTheme = useMemo(
    () => createAppTheme(theme, colors),
    [theme, colors]
  );

  if (user === null) {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <LandingPage />
          </ToastProvider>
        </QueryClientProvider>
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/dashboard" element={<IndexPage />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </QueryClientProvider>
    </MuiThemeProvider>
  );
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <LocaleProvider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "var(--bg-color)",
            }}
          >
            <CircularProgress
              size={60}
              sx={{ color: "var(--primary-color)" }}
            />
          </Box>
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LocaleProvider>
          <ThemedApp user={user} />
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
