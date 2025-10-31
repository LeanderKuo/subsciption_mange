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
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Category as CategoryIcon } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AddSubscriptionDialog } from "../components/AddSubscriptionDialog";
import { CategoryManagementDialog } from "../components/CategoryManagementDialog";
import { StatsCard } from "../components/StatsCard";
import { SubscriptionCard } from "../components/SubscriptionCard";
import {
  createSubscription,
  deleteSubscription,
  fetchSubscriptions,
  updateSubscription,
  signOut,
} from "../services/supabaseService";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import { useToast } from "../hooks/use-toast";
import { Subscription, SubscriptionInput, SubscriptionCategoryInput, SubscriptionCategory } from "../types/subscription";
import { supabase } from "../services/supabaseClient";
import { getExchangeRate } from "../services/exchangeRateService";

const UNCATEGORIZED_DISPLAY = {
  name: '未分類',
  color: '#9CA3AF',
} as const;

const IndexPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userDefaultCurrency, setUserDefaultCurrency] = useState<string>("TWD");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'endDate' | 'price' | 'name'>('endDate');
  const [draggedSubscriptionId, setDraggedSubscriptionId] = useState<number | null>(null);
  const [activeDropTarget, setActiveDropTarget] = useState<string | null>(null);
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

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "新增成功",
        description: "類型已新增。",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<SubscriptionCategoryInput> }) =>
      updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "更新成功",
        description: "類型已更新。",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: "刪除成功",
        description: "類型已刪除。",
      });
    },
  });

  const handleAddCategory = async (payload: SubscriptionCategoryInput) => {
    await createCategoryMutation.mutateAsync(payload);
  };

  const handleUpdateCategory = async (
    id: number,
    updates: Partial<SubscriptionCategoryInput>
  ) => {
    await updateCategoryMutation.mutateAsync({ id, updates });
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategoryMutation.mutateAsync(id);
  };

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

  // Sort subscriptions
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    switch (sortBy) {
      case 'endDate':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'price':
        const rateA = exchangeRates[a.currency] || 1;
        const rateB = exchangeRates[b.currency] || 1;
        const priceA = a.price * rateA;
        const priceB = b.price * rateB;
        return priceB - priceA; // Descending
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categoryMap = useMemo(() => {
    const map = new Map<number, SubscriptionCategory>();
    categories.forEach((category) => {
      map.set(category.id, category);
    });
    return map;
  }, [categories]);

  const getCategoryDisplay = (subscription: Subscription) => {
    if (subscription.categoryId) {
      const category = categoryMap.get(subscription.categoryId);
      if (category) {
        return {
          name: category.name,
          color: category.color,
        };
      }
    }
    return UNCATEGORIZED_DISPLAY;
  };

  const groupedSubscriptions = useMemo(() => {
    if (sortBy !== 'name') {
      return [];
    }

    const nameSorted = [...sortedSubscriptions];
    const groups: Array<{
      key: string;
      title: string;
      color: string;
      categoryId: number | null;
      subscriptions: Subscription[];
    }> = [];

    const orderedCategories = [...categories].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    orderedCategories.forEach((category) => {
      const items = nameSorted.filter((sub) => sub.categoryId === category.id);
      groups.push({
        key: `category-${category.id}`,
        title: category.name,
        color: category.color,
        categoryId: category.id,
        subscriptions: items,
      });
    });

    const uncategorizedItems = nameSorted.filter((sub) => !sub.categoryId);
    groups.push({
      key: 'category-uncategorized',
      title: UNCATEGORIZED_DISPLAY.name,
      color: UNCATEGORIZED_DISPLAY.color,
      categoryId: null,
      subscriptions: uncategorizedItems,
    });

    return groups;
  }, [categories, sortBy, sortedSubscriptions]);

  const handleDragStart = (subscriptionId: number) => {
    setDraggedSubscriptionId(subscriptionId);
  };

  const handleDragEnd = () => {
    setDraggedSubscriptionId(null);
    setActiveDropTarget(null);
  };

  const handleDropOnCategory = async (categoryId: number | null) => {
    if (draggedSubscriptionId === null) {
      return;
    }
    const subscription = subscriptions.find((sub) => sub.id === draggedSubscriptionId);
    setActiveDropTarget(null);
    setDraggedSubscriptionId(null);
    if (!subscription) {
      return;
    }
    const currentCategory = subscription.categoryId ?? null;
    if (currentCategory === (categoryId ?? null)) {
      return;
    }
    await handleEdit({
      ...subscription,
      categoryId,
    });
  };

  const handleDragEnter = (groupKey: string) => {
    if (draggedSubscriptionId !== null) {
      setActiveDropTarget(groupKey);
    }
  };

  const handleDragLeave = (groupKey: string) => {
    if (activeDropTarget === groupKey) {
      setActiveDropTarget(null);
    }
  };

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
                categories={categories}
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
              mb={3}
              flexWrap="wrap"
              gap={2}>
              <Typography variant="h6">所有訂閱</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  startIcon={<CategoryIcon />}
                  variant="outlined"
                  onClick={() => setCategoryDialogOpen(true)}
                  sx={{
                    borderColor: '#000',
                    color: '#000',
                    '&:hover': { borderColor: '#333', backgroundColor: '#f5f5f5' },
                  }}
                >
                  管理類型
                </Button>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>排序</InputLabel>
                  <Select
                    value={sortBy}
                    label="排序"
                    onChange={(e) => setSortBy(e.target.value as 'endDate' | 'price' | 'name')}
                    sx={{
                      borderColor: '#000',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000',
                      },
                    }}
                  >
                    <MenuItem value="endDate">到期日期</MenuItem>
                    <MenuItem value="price">月費價格</MenuItem>
                    <MenuItem value="name">服務名稱</MenuItem>
                  </Select>
                </FormControl>
                <AddSubscriptionDialog
                  onAdd={handleAdd}
                  disabled={createMutation.isPending}
                  categories={categories}
                />
              </Stack>
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
            ) : sortBy === 'name' ? (
              <Stack spacing={3}>
                {groupedSubscriptions.map((group) => (
                  <Box
                    key={group.key}
                    sx={{
                      border: `2px solid ${group.color}`,
                      borderRadius: 2,
                      p: 2,
                      backgroundColor:
                        activeDropTarget === group.key ? 'rgba(0,0,0,0.04)' : '#fff',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                    }}
                    onDragOver={(event) => {
                      if (draggedSubscriptionId !== null) {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                      }
                    }}
                    onDragEnter={() => handleDragEnter(group.key)}
                    onDragLeave={() => handleDragLeave(group.key)}
                    onDrop={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      void handleDropOnCategory(group.categoryId);
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      sx={{ mb: 2, color: group.color }}
                    >
                      {group.title}
                    </Typography>
                    {group.subscriptions.length === 0 ? (
                      <Box
                        sx={{
                          border: '2px dashed rgba(0,0,0,0.2)',
                          borderRadius: 2,
                          p: 3,
                          textAlign: 'center',
                          color: 'text.secondary',
                          fontSize: 14,
                        }}
                      >
                        拖曳訂閱至此分類
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {group.subscriptions.map((subscription) => (
                          <Grid item xs={12} md={6} lg={4} key={subscription.id}>
                            <SubscriptionCard
                              subscription={subscription}
                              onDelete={handleDelete}
                              onEdit={handleEdit}
                              categories={categories}
                              categoryColor={group.color}
                              categoryName={group.title}
                              draggable
                              onDragStart={(subscriptionId) => handleDragStart(subscriptionId)}
                              onDragEnd={handleDragEnd}
                              isDragging={draggedSubscriptionId === subscription.id}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Grid container spacing={2}>
                {sortedSubscriptions.map((subscription) => {
                  const categoryDisplay = getCategoryDisplay(subscription);
                  return (
                    <Grid item xs={12} md={6} lg={4} key={subscription.id}>
                      <SubscriptionCard
                        subscription={subscription}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        categories={categories}
                        categoryColor={categoryDisplay.color}
                        categoryName={categoryDisplay.name}
                        draggable={sortBy === 'name'}
                        onDragStart={
                          sortBy === 'name'
                            ? (subscriptionId) => handleDragStart(subscriptionId)
                            : undefined
                        }
                        onDragEnd={sortBy === 'name' ? handleDragEnd : undefined}
                        isDragging={draggedSubscriptionId === subscription.id}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Container>

      <CategoryManagementDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default IndexPage;
