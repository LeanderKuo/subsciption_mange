import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./services/supabaseClient";
import IndexPage from "./pages/Index";
import NotFoundPage from "./pages/NotFound";
import LandingPage from "./pages/Landing";
import UserSettings from "./pages/UserSettings";
import { ToastProvider } from "./components/ToastProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { LocaleProvider } from "./i18n/LocaleProvider";

const queryClient = new QueryClient();

// Open Screen style theme: Dark Mode with Mint Green Accent
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#34b27b", // Mint Green
      contrastText: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#000000",
      paper: "#0a0a0a",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
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
          borderRadius: "999px", // Pill shape
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
        contained: {
          backgroundImage: "linear-gradient(45deg, #34b27b 30%, #2dd4bf 90%)",
          color: "#000000",
          boxShadow: "0 3px 5px 2px rgba(52, 178, 123, .3)",
          "&:hover": {
            backgroundImage: "linear-gradient(45deg, #2ea16f 30%, #25b3a1 90%)",
            boxShadow: "0 3px 5px 2px rgba(52, 178, 123, .5)",
          },
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          "&:hover": {
            borderColor: "#34b27b",
            backgroundColor: "rgba(52, 178, 123, 0.1)",
          },
        },
        text: {
          color: "#ffffff",
          "&:hover": {
            color: "#34b27b",
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.03)", // Glass morphism base
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
          transition:
            "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: "rgba(52, 178, 123, 0.5)",
            boxShadow: "0 10px 40px -10px rgba(52, 178, 123, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Remove default MUI paper gradients in dark mode
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background: "#0a0a0a",
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading indicator while checking auth
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocaleProvider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#fff",
            }}
          >
            <CircularProgress size={60} sx={{ color: "#000" }} />
          </Box>
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  // Render landing page when user is signed out
  if (user === null) {
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocaleProvider>
            <QueryClientProvider client={queryClient}>
              <ToastProvider>
                <LandingPage />
              </ToastProvider>
            </QueryClientProvider>
          </LocaleProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // Render main app when user is signed in
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocaleProvider>
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
        </LocaleProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
