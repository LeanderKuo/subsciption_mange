import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddSubscriptionDialog } from "../components/AddSubscriptionDialog";
import { StatsCard } from "../components/StatsCard";
import { SubscriptionCard } from "../components/SubscriptionCard";
import {
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
  signOut,
} from "../services/supabaseService";
import { useToast } from "../hooks/use-toast";
import { Subscription, SubscriptionInput } from "../types/subscription";
import { supabase } from "../services/supabaseClient";
import { getExchangeRate } from "../services/exchangeRateService";

const IndexPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userDefaultCurrency, setUserDefaultCurrency] = useState<string>("TWD");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");

        // Fetch user's default currency from profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('default_currency')
          .eq('id', user.id)
          .single();

        if (profile?.default_currency) {
          setUserDefaultCurrency(profile.default_currency);
          console.log('User default currency:', profile.default_currency);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoToSettings = () => {
    handleMenuClose();
    navigate('/settings');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "已登出",
        description: "您已成功登出",
      });
      // 使用較短的延遲後重新載入，讓 toast 有時間顯示
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      toast({
        title: "登出失敗",
        description: "請稍後再試",
        variant: "destructive",
      });
    }
  };

  const {
    data: subscriptions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });

  // Fetch exchange rates for all currencies used in subscriptions
  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (subscriptions.length === 0 || !userDefaultCurrency) return;

      const currencies = Array.from(new Set(subscriptions.map(sub => sub.currency)));
      console.log('Fetching exchange rates for currencies:', currencies);
      console.log('Target currency (user default):', userDefaultCurrency);
      const rates: Record<string, number> = {};

      for (const currency of currencies) {
        if (currency === userDefaultCurrency) {
          rates[currency] = 1;
        } else {
          const rate = await getExchangeRate(currency, userDefaultCurrency);
          rates[currency] = rate;
          console.log(`Fetched rate for ${currency} -> ${userDefaultCurrency}: ${rate}`);
        }
      }

      console.log('All exchange rates loaded:', rates);
      setExchangeRates(rates);
    };

    fetchExchangeRates();
  }, [subscriptions, userDefaultCurrency]);

  const createMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: "新增成功",
        description: `已新增 ${result.name} 訂閱`,
      });
    },
    onError: () => {
      toast({
        title: "新增失敗",
        description: "請稍後再試一次。",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: "更新成功",
        description: `已更新 ${result.name} 訂閱`,
      });
    },
    onError: () => {
      toast({
        title: "更新失敗",
        description: "請稍後再試一次。",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: "刪除成功",
        description: "訂閱已刪除。",
      });
    },
    onError: () => {
      toast({
        title: "刪除失敗",
        description: "請稍後再試一次。",
        variant: "destructive",
      });
    },
  });

  const handleAdd = async (payload: SubscriptionInput) => {
    await createMutation.mutateAsync(payload);
  };

  const handleEdit = async (subscription: Subscription) => {
    await updateMutation.mutateAsync(subscription);
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    // Get exchange rate, fallback to 1 if not yet loaded
    const rate = exchangeRates[sub.currency];

    // If rate is undefined and currency is not user's default, skip this subscription for now
    if (!rate && sub.currency !== userDefaultCurrency) {
      console.log(`Exchange rate not loaded yet for ${sub.currency}`);
      return sum;
    }

    const effectiveRate = rate || 1;
    const priceInUserCurrency = sub.price * effectiveRate;

    // Convert to monthly cost based on cycle
    let monthlyCost = priceInUserCurrency;
    if (sub.cycle === '1year') {
      monthlyCost = priceInUserCurrency / 12;
    } else if (sub.cycle === '6months') {
      monthlyCost = priceInUserCurrency / 6;
    }

    console.log(`Subscription: ${sub.name}, Price: ${sub.price} ${sub.currency}, Rate: ${effectiveRate}, Monthly: ${monthlyCost} ${userDefaultCurrency}`);

    return sum + monthlyCost;
  }, 0);

  const activeSubscriptions = subscriptions.filter(
    (sub) => differenceInDays(new Date(sub.endDate), new Date()) >= 0
  ).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Box
        component="header"
        sx={{ borderBottom: "2px solid #000", backgroundColor: "#000" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <div>
              <Typography variant="h4" fontWeight={700} sx={{ color: "#fff" }}>
                訂閱管理平台
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "#ccc" }}>
                輕鬆管理你的所有訂閱服務
              </Typography>
            </div>
            <Stack direction="row" spacing={2} alignItems="center">
              <AddSubscriptionDialog
                onAdd={handleAdd}
                disabled={createMutation.isPending}
              />
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#fff',
                    color: '#000',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                  }}
                >
                  {userEmail.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    border: '2px solid #000',
                    borderRadius: 2,
                    minWidth: 200,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem' }}>
                    登入為
                  </Typography>
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#000' }}>
                    {userEmail}
                  </Typography>
                </Box>
                <MenuItem onClick={handleGoToSettings}>個人設定</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  登出
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" gutterBottom>
              無法載入資料
            </Typography>
            <Typography variant="body2" color="text.secondary">
              請確認後端服務是否啟動，或稍後再試。
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <StatsCard
                  title="總月費"
                  value={`${userDefaultCurrency} ${Math.round(totalMonthly)}`}
                  icon={<AttachMoneyIcon color="primary" />}
                  description={`${subscriptions.length} 個服務`}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatsCard
                  title="使用中"
                  value={activeSubscriptions}
                  icon={<CalendarMonthIcon color="secondary" />}
                  description="個訂閱服務"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatsCard
                  title="年度預估"
                  value={`${userDefaultCurrency} ${Math.round(totalMonthly * 12)}`}
                  icon={<TrendingUpIcon color="secondary" />}
                  description="預估花費"
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}>
              <Typography variant="h6">所有訂閱</Typography>
              <AddSubscriptionDialog
                onAdd={handleAdd}
                disabled={createMutation.isPending}
              />
            </Stack>

            {subscriptions.length === 0 ? (
              <Box
                sx={{
                  border: "2px dashed #d1d5db",
                  borderRadius: 2,
                  textAlign: "center",
                  py: 8,
                  backgroundColor: "#fff",
                }}>
                <CalendarMonthIcon
                  sx={{ fontSize: 48, color: "text.secondary" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  尚未新增任何訂閱
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}>
                  點擊「新增訂閱」開始管理你的訂閱服務
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {subscriptions.map((subscription) => (
                  <Grid item xs={12} md={6} lg={4} key={subscription.id}>
                    <SubscriptionCard
                      subscription={subscription}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default IndexPage;
