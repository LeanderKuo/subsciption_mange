<<<<<<< HEAD
import { CssBaseline, ThemeProvider, createTheme, CircularProgress, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './services/supabaseClient';
import IndexPage from './pages/Index';
import NotFoundPage from './pages/NotFound';
import LandingPage from './pages/Landing';
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
=======
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";
import IndexPage from "./pages/Index";
import NotFoundPage from "./pages/NotFound";
import { AuthDialog } from "./components/AuthDialog";
import { ToastProvider } from "./components/ToastProvider";
>>>>>>> df675662bf97e187ceb2c67e56c7f40e18326871

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: { main: "#6d4eff" },
    secondary: { main: "#a78bfa" },
    background: { default: "#f7f7fb" },
  },
  typography: {
    fontFamily:
      '"Inter", "Noto Sans TC", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
<<<<<<< HEAD
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
=======
  console.log("Supabase URL:", process.env.REACT_APP_SUPABASE_URL);
  console.log(
    "Supabase Anon Key:",
    process.env.REACT_APP_SUPABASE_ANON_KEY ? "Set" : "Not set"
  );

  const [user, setUser] = useState<any>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
>>>>>>> df675662bf97e187ceb2c67e56c7f40e18326871

  useEffect(() => {
    // 檢查初始用戶狀態
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // 監聽認證狀態變化
<<<<<<< HEAD
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
=======
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
>>>>>>> df675662bf97e187ceb2c67e56c7f40e18326871

    return () => subscription.unsubscribe();
  }, []);

  // 載入中狀態
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
<<<<<<< HEAD
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f7f7fb',
          }}
        >
          <CircularProgress size={60} />
        </Box>
=======
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthDialog
              open={authDialogOpen}
              onClose={() => setAuthDialogOpen(false)}
              onAuthSuccess={handleAuthSuccess}
            />
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f7f7fb",
              }}>
              <div style={{ textAlign: "center" }}>
                <h1>訂閱管理平台</h1>
                <p>請登入以繼續使用</p>
                <button
                  onClick={() => setAuthDialogOpen(true)}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#6d4eff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}>
                  登入 / 註冊
                </button>
              </div>
            </div>
          </ToastProvider>
        </QueryClientProvider>
>>>>>>> df675662bf97e187ceb2c67e56c7f40e18326871
      </ThemeProvider>
    );
  }

  // 未登入 - 顯示 Landing Page
  if (user === null) {
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <LandingPage />
            </ToastProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  // 已登入 - 顯示應用主體
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
