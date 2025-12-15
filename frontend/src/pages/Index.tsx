import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import { Category as CategoryIcon } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import { useState, useEffect, useMemo, useCallback } from "react";
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
import {
  Subscription,
  SubscriptionInput,
  SubscriptionCategoryInput,
  SubscriptionCategory,
} from "../types/subscription";
import { supabase } from "../services/supabaseClient";
import { getExchangeRate } from "../services/exchangeRateService";
import { useLocale } from "../i18n/LocaleProvider";
import { computeMonthlyCost, parseBillingCycle } from "../utils/billingUtils";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import AccountMenu from "../components/AccountMenu";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTheme } from "../theme/ThemeProvider";
import SubscriptionCalendarDialog from "../components/SubscriptionCalendarDialog";
import {
  DataOverviewDialog,
  type OverviewTab,
} from "../components/DataOverviewDialog";

type SortOption = "endDate" | "price" | "name";
type StatusFilter = "active" | "all" | "expired";

type CategoryDisplay = {
  name: string;
  color: string;
};

type CategoryGroup = {
  key: string;
  title: string;
  color: string;
  categoryId: number | null;
  subscriptions: Subscription[];
  totalMonthly: number;
};

const DEFAULT_CURRENCY = "TWD";

const resolveRate = (
  currency: string,
  rates: Record<string, number>,
  targetCurrency: string
) => {
  if (currency === targetCurrency) {
    return 1;
  }
  return rates[currency];
};

const convertToTargetCurrency = (
  subscription: Subscription,
  rates: Record<string, number>,
  targetCurrency: string,
  mode: "original" | "monthly"
) => {
  const rate = resolveRate(subscription.currency, rates, targetCurrency) ?? 1;

  let price = subscription.price;
  if (mode === "monthly") {
    const { billingPeriod, customDuration } = parseBillingCycle(
      subscription.cycle
    );
    price = computeMonthlyCost(
      subscription.price,
      billingPeriod,
      customDuration,
      subscription.cycle
    );
  }

  return price * rate;
};

const computeSubscriptionMonthlyCost = (
  subscription: Subscription,
  rates: Record<string, number>,
  targetCurrency: string
): number | null => {
  const rate = resolveRate(subscription.currency, rates, targetCurrency);
  if (!rate && subscription.currency !== targetCurrency) {
    return null;
  }

  const effectiveRate = rate ?? 1;
  const { billingPeriod, customDuration } = parseBillingCycle(
    subscription.cycle
  );
  const monthlyPrice = computeMonthlyCost(
    subscription.price,
    billingPeriod,
    customDuration,
    subscription.cycle
  );

  return monthlyPrice * effectiveRate;
};

const computeTotalMonthly = (
  subscriptions: Subscription[],
  rates: Record<string, number>,
  targetCurrency: string
) =>
  subscriptions.reduce((sum, subscription) => {
    const monthly = computeSubscriptionMonthlyCost(
      subscription,
      rates,
      targetCurrency
    );
    return monthly === null ? sum : sum + monthly;
  }, 0);

const countActiveSubscriptions = (subscriptions: Subscription[]) => {
  const today = new Date();
  return subscriptions.reduce((count, subscription) => {
    const remainingDays = differenceInDays(
      new Date(subscription.endDate),
      today
    );
    return remainingDays >= 0 ? count + 1 : count;
  }, 0);
};

const sortSubscriptionsBy = (
  subscriptions: Subscription[],
  sortBy: SortOption,
  rates: Record<string, number>,
  targetCurrency: string,
  priceDisplayMode: "original" | "monthly"
) => {
  const list = [...subscriptions];
  switch (sortBy) {
    case "endDate":
      return list.sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      );
    case "price":
      return list.sort((a, b) => {
        const priceA = convertToTargetCurrency(
          a,
          rates,
          targetCurrency,
          priceDisplayMode
        );
        const priceB = convertToTargetCurrency(
          b,
          rates,
          targetCurrency,
          priceDisplayMode
        );
        return priceB - priceA;
      });
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
};

const buildCategoryMap = (categories: SubscriptionCategory[]) => {
  const map = new Map<number, SubscriptionCategory>();
  categories.forEach((category) => {
    map.set(category.id, category);
  });
  return map;
};

const resolveCategoryDisplay = (
  subscription: Subscription,
  categoryMap: Map<number, SubscriptionCategory>,
  fallback: CategoryDisplay
): CategoryDisplay => {
  if (subscription.categoryId) {
    const category = categoryMap.get(subscription.categoryId);
    if (category) {
      return {
        name: category.name,
        color: category.color,
      };
    }
  }
  return fallback;
};

const buildGroupedSubscriptions = (
  subscriptions: Subscription[],
  categories: SubscriptionCategory[],
  rates: Record<string, number>,
  targetCurrency: string,
  uncategorizedDisplay: CategoryDisplay
): CategoryGroup[] => {
  const groups: CategoryGroup[] = [];
  const orderedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  orderedCategories.forEach((category) => {
    const items = subscriptions.filter((sub) => sub.categoryId === category.id);
    const categoryTotal = items.reduce((sum, subscription) => {
      const monthly = computeSubscriptionMonthlyCost(
        subscription,
        rates,
        targetCurrency
      );
      return monthly === null ? sum : sum + monthly;
    }, 0);

    groups.push({
      key: `category-${category.id}`,
      title: category.name,
      color: category.color,
      categoryId: category.id,
      subscriptions: items,
      totalMonthly: categoryTotal,
    });
  });

  const uncategorizedItems = subscriptions.filter((sub) => !sub.categoryId);
  const uncategorizedTotal = uncategorizedItems.reduce((sum, subscription) => {
    const monthly = computeSubscriptionMonthlyCost(
      subscription,
      rates,
      targetCurrency
    );
    return monthly === null ? sum : sum + monthly;
  }, 0);

  groups.push({
    key: "category-uncategorized",
    title: uncategorizedDisplay.name,
    color: uncategorizedDisplay.color,
    categoryId: null,
    subscriptions: uncategorizedItems,
    totalMonthly: uncategorizedTotal,
  });

  return groups;
};

const useUserProfileSnapshot = () => {
  const [state, setState] = useState({
    email: "",
    defaultCurrency: DEFAULT_CURRENCY,
  });

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || !active) {
          return;
        }

        const email = user.email ?? "";
        let defaultCurrency = DEFAULT_CURRENCY;

        const { data } = await supabase
          .from("user_profiles")
          .select("default_currency")
          .eq("id", user.id)
          .single();

        if (data?.default_currency) {
          defaultCurrency = data.default_currency;
        }

        if (active) {
          setState({ email, defaultCurrency });
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  return state;
};

const useExchangeRates = (
  subscriptions: Subscription[],
  targetCurrency: string
) => {
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!subscriptions.length || !targetCurrency) {
      setRates({});
      return;
    }

    let cancelled = false;
    const loadRates = async () => {
      const currencies = Array.from(
        new Set(subscriptions.map((sub) => sub.currency))
      );

      const tasks = currencies.map(async (currency) => {
        if (currency === targetCurrency) {
          return [currency, 1] as const;
        }
        const rate = await getExchangeRate(currency, targetCurrency);
        return [currency, rate] as const;
      });

      try {
        const results = await Promise.all(tasks);
        if (!cancelled) {
          const next: Record<string, number> = {};
          results.forEach(([currency, rate]) => {
            next[currency] = rate;
          });
          setRates(next);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    };

    loadRates();

    return () => {
      cancelled = true;
    };
  }, [subscriptions, targetCurrency]);

  return rates;
};

const IndexPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { email: userEmail, defaultCurrency: userDefaultCurrency } =
    useUserProfileSnapshot();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("endDate");
  const [priceDisplayMode, setPriceDisplayMode] = useState<
    "original" | "monthly"
  >("original");
  const [draggedSubscriptionId, setDraggedSubscriptionId] = useState<
    number | null
  >(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [activeDropTarget, setActiveDropTarget] = useState<string | null>(null);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [overviewDialogOpen, setOverviewDialogOpen] = useState(false);
  const [overviewInitialTab, setOverviewInitialTab] =
    useState<OverviewTab>("calendar");
  const { t, locale, setLocale } = useLocale();
  const { theme, colors, toggleTheme } = useTheme();

  const handleOpenOverview = (tab: OverviewTab) => {
    setOverviewInitialTab(tab);
    setOverviewDialogOpen(true);
  };

  const handleGoToSettings = () => {
    navigate("/settings");
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
      <ThemeSwitcher />
      <LanguageSwitcher value={locale} onChange={setLocale} variant={theme} />
      <AccountMenu
        email={userEmail}
        onSettings={handleGoToSettings}
        onLogout={handleLogout}
      />
    </>
  );

  // 行動版快捷操作（直接顯示在 Header）
  const mobileQuickActions = (
    <>
      <ThemeSwitcher />
      <LanguageSwitcher value={locale} onChange={setLocale} variant={theme} />
    </>
  );

  // Drawer 內的條列式選單
  const drawerMenuItems = [
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
    {
      icon: <SettingsIcon />,
      label: t("header.menu.settings"),
      onClick: handleGoToSettings,
    },
  ];

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

  const exchangeRates = useExchangeRates(subscriptions, userDefaultCurrency);

  const uncategorizedDisplay = useMemo(
    () => ({
      name: t("categories.uncategorized"),
      color: "#9CA3AF" as const,
    }),
    [t]
  );

  const createMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: t("notifications.create.successTitle"),
        description: t("notifications.create.successDescription", {
          name: result.name,
        }),
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
        description: t("notifications.update.successDescription", {
          name: result.name,
        }),
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
        title: t("category.notifications.createTitle"),
        description: t("category.notifications.createSuccess"),
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<SubscriptionCategoryInput>;
    }) => updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: t("category.notifications.updateTitle"),
        description: t("category.notifications.updateSuccess"),
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast({
        title: t("category.notifications.deleteTitle"),
        description: t("category.notifications.deleteSuccess"),
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

  const totalMonthly = useMemo(
    () =>
      computeTotalMonthly(subscriptions, exchangeRates, userDefaultCurrency),
    [subscriptions, exchangeRates, userDefaultCurrency]
  );

  const activeSubscriptions = useMemo(
    () => countActiveSubscriptions(subscriptions),
    [subscriptions]
  );

  const sortedSubscriptions = useMemo(
    () =>
      sortSubscriptionsBy(
        subscriptions,
        sortBy,
        exchangeRates,
        userDefaultCurrency,
        priceDisplayMode
      ),
    [
      subscriptions,
      sortBy,
      exchangeRates,
      userDefaultCurrency,
      priceDisplayMode,
    ]
  );

  const categoryMap = useMemo(() => buildCategoryMap(categories), [categories]);

  // Filter subscriptions by status
  const filteredByStatus = useMemo(() => {
    const today = new Date();
    if (statusFilter === "all") {
      return sortedSubscriptions;
    }
    return sortedSubscriptions.filter((sub) => {
      const remainingDays = differenceInDays(new Date(sub.endDate), today);
      if (statusFilter === "active") {
        return remainingDays >= 0;
      }
      // expired
      return remainingDays < 0;
    });
  }, [sortedSubscriptions, statusFilter]);

  const getCategoryDisplay = useCallback(
    (subscription: Subscription) =>
      resolveCategoryDisplay(subscription, categoryMap, uncategorizedDisplay),
    [categoryMap, uncategorizedDisplay]
  );

  const groupedSubscriptions = useMemo(() => {
    if (sortBy !== "name") {
      return [];
    }

    return buildGroupedSubscriptions(
      filteredByStatus,
      categories,
      exchangeRates,
      userDefaultCurrency,
      uncategorizedDisplay
    );
  }, [
    sortBy,
    filteredByStatus,
    categories,
    exchangeRates,
    userDefaultCurrency,
    uncategorizedDisplay,
  ]);

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

    const subscription = subscriptions.find(
      (sub) => sub.id === draggedSubscriptionId
    );

    setActiveDropTarget(null);
    setDraggedSubscriptionId(null);

    if (!subscription) {
      return;
    }

    const nextCategory = categoryId ?? null;
    const currentCategory = subscription.categoryId ?? null;
    if (currentCategory === nextCategory) {
      return;
    }

    await handleEdit({
      ...subscription,
      categoryId: nextCategory,
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
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.3s ease",
      }}
    >
      <SiteHeader
        navLinks={[]}
        subtitle={t("header.subtitle")}
        rightSlot={headerRight}
        mobileQuickActions={mobileQuickActions}
        drawerMenuItems={drawerMenuItems}
        variant={theme}
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
                {t("error.loadData")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("error.loadDataHint")}
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
                    description={t("dashboard.totalSubscriptions", {
                      count: subscriptions.length,
                    })}
                    onClick={() => handleOpenOverview("monthly")}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StatsCard
                    title={t("dashboard.active")}
                    value={activeSubscriptions}
                    icon={<CalendarMonthIcon />}
                    description={t("dashboard.activeDescription")}
                    onClick={() => handleOpenOverview("calendar")}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <StatsCard
                    title={t("dashboard.annualEstimate")}
                    value={`${userDefaultCurrency} ${Math.round(
                      totalMonthly * 12
                    )}`}
                    icon={<TrendingUpIcon color="secondary" />}
                    description={t("dashboard.annualEstimateDescription")}
                    onClick={() => handleOpenOverview("annual")}
                  />
                </Grid>
              </Grid>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                justifyContent="space-between"
                mb={4}
                gap={2}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ mb: { xs: 1, sm: 0 } }}
                >
                  {t("dashboard.allSubscriptions")}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                  sx={{
                    "& > *": {
                      flexShrink: 0,
                    },
                    // 行動端控制項調整
                    "@media (max-width: 599px)": {
                      "& .MuiToggleButtonGroup-root": {
                        flexGrow: 1,
                      },
                      "& .MuiToggleButton-root": {
                        flex: 1,
                        fontSize: "0.75rem",
                        px: 1,
                      },
                    },
                  }}
                >
                  <ToggleButtonGroup
                    value={statusFilter}
                    exclusive
                    onChange={(e, newFilter) => {
                      if (newFilter) setStatusFilter(newFilter);
                    }}
                    size="small"
                    sx={{
                      height: 40,
                      "& .MuiToggleButton-root": {
                        borderColor: colors.border,
                        color: colors.text,
                        fontWeight: 600,
                        "&.Mui-selected": {
                          backgroundColor: colors.primary,
                          color: theme === "dark" ? "#000" : "#fff",
                          "&:hover": {
                            backgroundColor: colors.primaryHover,
                          },
                        },
                        "&:hover": {
                          backgroundColor: colors.primaryLight,
                        },
                      },
                    }}
                  >
                    <ToggleButton value="active">
                      {t("header.statusFilter.active")}
                    </ToggleButton>
                    <ToggleButton value="all">
                      {t("header.statusFilter.all")}
                    </ToggleButton>
                    <ToggleButton value="expired">
                      {t("header.statusFilter.expired")}
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <ToggleButtonGroup
                    value={priceDisplayMode}
                    exclusive
                    onChange={(e, newMode) => {
                      if (newMode) setPriceDisplayMode(newMode);
                    }}
                    size="small"
                    sx={{
                      height: 40,
                      "& .MuiToggleButton-root": {
                        borderColor: colors.border,
                        color: colors.text,
                        fontWeight: 600,
                        "&.Mui-selected": {
                          backgroundColor: colors.primary,
                          color: theme === "dark" ? "#000" : "#fff",
                          "&:hover": {
                            backgroundColor: colors.primaryHover,
                          },
                        },
                        "&:hover": {
                          backgroundColor: colors.primaryLight,
                        },
                      },
                    }}
                  >
                    <ToggleButton value="original">
                      {t("header.priceMode.original")}
                    </ToggleButton>
                    <ToggleButton value="monthly">
                      {t("header.priceMode.monthly")}
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <Button
                    startIcon={<CategoryIcon />}
                    variant="outlined"
                    onClick={() => setCategoryDialogOpen(true)}
                    sx={{
                      borderColor: colors.border,
                      color: colors.text,
                      "&:hover": {
                        borderColor: colors.primary,
                        backgroundColor: colors.primaryLight,
                      },
                    }}
                  >
                    {t("header.manageCategories")}
                  </Button>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel sx={{ color: colors.textSecondary }}>
                      {t("header.sort")}
                    </InputLabel>
                    <Select
                      value={sortBy}
                      label={t("header.sort")}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value as "endDate" | "price" | "name"
                        )
                      }
                      sx={{
                        borderColor: colors.border,
                        color: colors.text,
                        "& .MuiSelect-icon": { color: colors.text },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.border,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.primary,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.primary,
                        },
                      }}
                    >
                      <MenuItem value="endDate">
                        {t("header.sort.endDate")}
                      </MenuItem>
                      <MenuItem value="price">
                        {t("header.sort.price")}
                      </MenuItem>
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
                    border: "2px dashed rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    textAlign: "center",
                    py: 12,
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <CalendarMonthIcon
                    sx={{
                      fontSize: 64,
                      color: colors.textSecondary,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, color: colors.text, fontWeight: 600 }}
                  >
                    {t("dashboard.empty.title")}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, color: colors.textSecondary }}
                  >
                    {t("dashboard.empty.description")}
                  </Typography>
                </Box>
              ) : sortBy === "name" ? (
                <Stack spacing={3}>
                  {groupedSubscriptions.map((group) => (
                    <Box
                      key={group.key}
                      sx={{
                        border: `2px solid ${group.color}`,
                        borderRadius: 3,
                        p: 3,
                        backgroundColor:
                          activeDropTarget === group.key
                            ? colors.primaryLight
                            : "rgba(255, 255, 255, 0.02)",
                        transition: "all 0.3s ease",
                        boxShadow: "none",
                        backdropFilter: "blur(10px)",
                      }}
                      onDragOver={(event) => {
                        if (draggedSubscriptionId !== null) {
                          event.preventDefault();
                          event.dataTransfer.dropEffect = "move";
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          sx={{ color: group.color }}
                        >
                          {group.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          sx={{ color: group.color }}
                        >
                          {t("dashboard.totalMonthly")}: {userDefaultCurrency}{" "}
                          {Math.round(group.totalMonthly)}
                        </Typography>
                      </Stack>
                      {group.subscriptions.length === 0 ? (
                        <Box
                          sx={{
                            border: "2px dashed rgba(255, 255, 255, 0.1)",
                            borderRadius: 2,
                            p: 4,
                            textAlign: "center",
                            color: "rgba(255, 255, 255, 0.3)",
                            fontSize: 14,
                          }}
                        >
                          {t("categories.dropHint")}
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {group.subscriptions.map((subscription) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              lg={4}
                              key={subscription.id}
                            >
                              <SubscriptionCard
                                subscription={subscription}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                categories={categories}
                                categoryColor={group.color}
                                categoryName={group.title}
                                draggable
                                onDragStart={(subscriptionId) =>
                                  handleDragStart(subscriptionId)
                                }
                                onDragEnd={handleDragEnd}
                                isDragging={
                                  draggedSubscriptionId === subscription.id
                                }
                                priceDisplayMode={priceDisplayMode}
                                monthlyCost={computeSubscriptionMonthlyCost(
                                  subscription,
                                  exchangeRates,
                                  userDefaultCurrency
                                )}
                                targetCurrency={userDefaultCurrency}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Grid container spacing={3}>
                  {filteredByStatus.map((subscription) => {
                    const categoryDisplay = getCategoryDisplay(subscription);
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                        key={subscription.id}
                      >
                        <SubscriptionCard
                          subscription={subscription}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          categories={categories}
                          categoryColor={categoryDisplay.color}
                          categoryName={categoryDisplay.name}
                          draggable={false}
                          isDragging={false}
                          priceDisplayMode={priceDisplayMode}
                          monthlyCost={computeSubscriptionMonthlyCost(
                            subscription,
                            exchangeRates,
                            userDefaultCurrency
                          )}
                          targetCurrency={userDefaultCurrency}
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

      <SubscriptionCalendarDialog
        open={calendarDialogOpen}
        onClose={() => setCalendarDialogOpen(false)}
        subscriptions={subscriptions}
      />

      <DataOverviewDialog
        open={overviewDialogOpen}
        onClose={() => setOverviewDialogOpen(false)}
        subscriptions={subscriptions}
        categories={categories}
        initialTab={overviewInitialTab}
        targetCurrency={userDefaultCurrency}
        exchangeRates={exchangeRates}
      />
    </Box>
  );
};

export default IndexPage;
