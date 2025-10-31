import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import { AddSubscriptionDialog } from "../components/AddSubscriptionDialog";
import { StatsCard } from "../components/StatsCard";
import { SubscriptionCard } from "../components/SubscriptionCard";
import { LogoutButton } from "../components/LogoutButton";
import {
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
  signOut,
} from "../services/supabaseService";
import { useToast } from "../hooks/use-toast";
import { Subscription, SubscriptionInput } from "../types/subscription";

const IndexPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
    const price = sub.currency === "USD" ? sub.price * 30 : sub.price;
    return sum + price;
  }, 0);

  const activeSubscriptions = subscriptions.filter(
    (sub) => differenceInDays(new Date(sub.endDate), new Date()) >= 0
  ).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f7fb" }}>
      <Box
        component="header"
        sx={{ borderBottom: "1px solid #e5e5ef", backgroundColor: "#6d4eff" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <div>
              <Typography variant="h4" fontWeight={700} sx={{ color: "white" }}>
                訂閱管理平台
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "rgba(255, 255, 255, 0.8)" }}>
                輕鬆管理你的所有訂閱服務
              </Typography>
            </div>
            <Stack direction="row" spacing={2} alignItems="center">
              <AddSubscriptionDialog
                onAdd={handleAdd}
                disabled={createMutation.isPending}
              />
              <LogoutButton onLogout={handleLogout} />
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
                  value={`TWD ${Math.round(totalMonthly)}`}
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
                  value={`TWD ${Math.round(totalMonthly * 12)}`}
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
