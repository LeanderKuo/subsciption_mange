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
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";

const queryClient = new QueryClient();

// Create MUI theme based on our custom theme
const createAppTheme = (mode: "dark" | "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#34b27b" : "#1976d2",
        contrastText: mode === "dark" ? "#000000" : "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#ffffff" : "#666666",
      },
      background: {
        default: mode === "dark" ? "#000000" : "#f5f5f5",
        paper: mode === "dark" ? "#0a0a0a" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#212121",
        secondary: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "#666666",
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
            backgroundImage:
              mode === "dark"
                ? "linear-gradient(45deg, #34b27b 30%, #2dd4bf 90%)"
                : "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            color: mode === "dark" ? "#000000" : "#ffffff",
            boxShadow:
              mode === "dark"
                ? "0 3px 5px 2px rgba(52, 178, 123, .3)"
                : "0 3px 5px 2px rgba(25, 118, 210, .3)",
            "&:hover": {
              backgroundImage:
                mode === "dark"
                  ? "linear-gradient(45deg, #2ea16f 30%, #25b3a1 90%)"
                  : "linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)",
              boxShadow:
                mode === "dark"
                  ? "0 3px 5px 2px rgba(52, 178, 123, .5)"
                  : "0 3px 5px 2px rgba(25, 118, 210, .5)",
            },
          },
          outlined: {
            borderColor:
              mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "#bdbdbd",
            color: mode === "dark" ? "#ffffff" : "#212121",
            "&:hover": {
              borderColor: mode === "dark" ? "#34b27b" : "#1976d2",
              backgroundColor:
                mode === "dark"
                  ? "rgba(52, 178, 123, 0.1)"
                  : "rgba(25, 118, 210, 0.1)",
            },
          },
          text: {
            color: mode === "dark" ? "#ffffff" : "#212121",
            "&:hover": {
              color: mode === "dark" ? "#34b27b" : "#1976d2",
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            background:
              mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
            backdropFilter: "blur(10px)",
            border:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid #e0e0e0",
            boxShadow:
              mode === "dark" ? "none" : "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition:
              "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              borderColor:
                mode === "dark"
                  ? "rgba(52, 178, 123, 0.5)"
                  : "rgba(25, 118, 210, 0.5)",
              boxShadow:
                mode === "dark"
                  ? "0 10px 40px -10px rgba(52, 178, 123, 0.2)"
                  : "0 10px 40px -10px rgba(25, 118, 210, 0.2)",
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
            borderBottom:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid #e0e0e0",
            boxShadow: "none",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "16px",
            border:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid #e0e0e0",
            background: mode === "dark" ? "#0a0a0a" : "#ffffff",
          },
        },
      },
    },
  });

// Inner app component that uses theme context
const ThemedApp = ({ user }: { user: User | null }) => {
  const { theme } = useTheme();
  const muiTheme = useMemo(() => createAppTheme(theme), [theme]);

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
