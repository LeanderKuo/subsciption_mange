import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  MenuItem,
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
import { useLocale } from "../i18n/LocaleProvider";
import { getCycleDurationInMonths } from "../utils/subscriptionDates";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import AccountMenu from "../components/AccountMenu";

const IndexPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userDefaultCurrency, setUserDefaultCurrency] = useState<string>("TWD");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'endDate' | 'price' | 'name'>('endDate');
  const [draggedSubscriptionId, setDraggedSubscriptionId] = useState<number | null>(null);
  const [activeDropTarget, setActiveDropTarget] = useState<string | null>(null);
  const { t, locale, setLocale } = useLocale();

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: t("header.logoutSuccess"),
        description: t("header.logoutSuccessDescription"),
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      toast({
        title: t("header.logoutFailure"),
        description: t("header.logoutFailureDescription"),
        variant: "destructive",
      });
    }
  };

  const headerRight = (
    <>
      <LanguageSwitcher value={locale} onChange={setLocale} variant="light" />
      <AccountMenu
        email={userEmail}
        onSettings={handleGoToSettings}
        onLogout={handleLogout}
      />
    </>
  );

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

  const uncategorizedDisplay = useMemo(
    () => ({
      name: t("categories.uncategorized"),
      color: "#9CA3AF" as const,
    }),
    [t]
  );

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

      setExchangeRates(rates);
    };

    fetchExchangeRates();
  }, [subscriptions, userDefaultCurrency]);

  const createMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: t("notifications.create.successTitle"),
        description: t("notifications.create.successDescription", { name: result.name }),
      });
    },
    onError: () => {
      toast({
        title: t("notifications.create.errorTitle"),
        description: t("notifications.genericError"),
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: t("notifications.update.successTitle"),
        description: t("notifications.update.successDescription", { name: result.name }),
      });
    },
    onError: () => {
      toast({
        title: t("notifications.update.errorTitle"),
        description: t("notifications.genericError"),
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: t("notifications.delete.successTitle"),
        description: t("notifications.delete.successDescription"),
      });
    },
    onError: () => {
      toast({
        title: t("notifications.delete.errorTitle"),
        description: t("notifications.genericError"),
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
        title: t('category.notifications.createTitle'),
        description: t('category.notifications.createSuccess'),
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<SubscriptionCategoryInput> }) =>
      updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: t('category.notifications.updateTitle'),
        description: t('category.notifications.updateSuccess'),
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: t('category.notifications.deleteTitle'),
        description: t('category.notifications.deleteSuccess'),
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
    const cycleMonths = getCycleDurationInMonths(sub.cycle);
    const durationMonths = cycleMonths > 0 ? cycleMonths : 1;
    const monthlyCost = priceInUserCurrency / durationMonths;

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
    return uncategorizedDisplay;
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
      title: uncategorizedDisplay.name,
      color: uncategorizedDisplay.color,
      categoryId: null,
      subscriptions: uncategorizedItems,
    });

    return groups;
  }, [categories, sortBy, sortedSubscriptions, uncategorizedDisplay]);

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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SiteHeader
        navLinks={[]}
        subtitle={t('header.subtitle')}
        rightSlot={headerRight}
        variant="light"
      />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" gutterBottom>
              {t('error.loadData')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('error.loadDataHint')}
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <StatsCard
                  title={t("dashboard.totalMonthly")}
                  value={`${userDefaultCurrency} ${Math.round(totalMonthly)}`}
                  icon={<AttachMoneyIcon color="primary" />}
                  description={t("dashboard.totalSubscriptions", { count: subscriptions.length })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatsCard
                  title={t("dashboard.active")}
                  value={activeSubscriptions}
                  icon={<CalendarMonthIcon color="secondary" />}
                  description={t("dashboard.activeDescription")}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StatsCard
                  title={t("dashboard.annualEstimate")}
                  value={`${userDefaultCurrency} ${Math.round(totalMonthly * 12)}`}
                  icon={<TrendingUpIcon color="secondary" />}
                  description={t("dashboard.annualEstimateDescription")}
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
              <Typography variant="h6">{t("dashboard.allSubscriptions")}</Typography>
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
                  {t("header.manageCategories")}
                </Button>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>{t("header.sort")}</InputLabel>
                  <Select
                    value={sortBy}
                    label={t("header.sort")}
                    onChange={(e) => setSortBy(e.target.value as 'endDate' | 'price' | 'name')}
                    sx={{
                      borderColor: '#000',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#000',
                      },
                    }}
                  >
                    <MenuItem value="endDate">{t("header.sort.endDate")}</MenuItem>
                    <MenuItem value="price">{t("header.sort.price")}</MenuItem>
                    <MenuItem value="name">{t("header.sort.name")}</MenuItem>
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
                  {t("dashboard.empty.title")}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}>
                  {t("dashboard.empty.description")}
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
                        {t("categories.dropHint")}
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
                        draggable={false}
                        isDragging={false}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
        </Container>
      </Box>

      <SiteFooter />

      <CategoryManagementDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        categories={categories}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </Box>
  );
};

export default IndexPage;
