import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  Notifications,
  Security,
  ExpandMore,
  CheckCircle,
} from "@mui/icons-material";
import { useState } from "react";
import { AuthDialog } from "../components/AuthDialog";

const Landing = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const features = [
    {
      icon: <AttachMoney sx={{ fontSize: 48 }} />,
      title: "智能費用追蹤",
      description: "自動計算月費、年費，一目了然掌握訂閱開支",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: "數據分析儀表板",
      description: "視覺化呈現訂閱趨勢，幫助你做出更明智的決策",
    },
    {
      icon: <Notifications sx={{ fontSize: 48 }} />,
      title: "到期提醒通知",
      description: "永遠不會錯過續訂日期，避免服務中斷",
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: "安全可靠",
      description: "基於 Supabase 的企業級安全保障，資料加密存儲",
    },
  ];

  const stats = [
    { value: "10,000+", label: "活躍用戶" },
    { value: "50,000+", label: "管理訂閱數" },
    { value: "NT$500萬+", label: "節省費用" },
    { value: "4.8/5.0", label: "用戶評分" },
  ];

  const faqs = [
    {
      question: "這個服務是免費的嗎？",
      answer: "是的！我們提供完全免費的訂閱管理服務。未來可能會推出進階功能的付費版本。",
    },
    {
      question: "我的資料安全嗎？",
      answer: "絕對安全！我們使用 Supabase 企業級資料庫，所有資料都經過加密存儲，並採用 Row Level Security (RLS) 確保只有您能存取自己的資料。",
    },
    {
      question: "支援哪些訂閱服務？",
      answer: "我們支援所有類型的訂閱服務，包括串流媒體（Netflix、Spotify）、軟體服務（Adobe、Microsoft 365）、健身會員等。",
    },
    {
      question: "可以設定提醒通知嗎？",
      answer: "目前正在開發中！我們即將推出 Email 和推播通知功能，讓您永遠不會錯過續訂日期。",
    },
    {
      question: "支援多個裝置嗎？",
      answer: "是的！您可以在任何裝置上登入使用，資料會即時同步。支援桌面、平板和手機。",
    },
  ];

  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
    window.location.reload();
  };

  return (
    <Box sx={{ backgroundColor: "#f7f7fb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6d4eff 0%, #a78bfa 100%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="全新上線"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                fontWeight={800}
                gutterBottom
                sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
              >
                輕鬆管理你的所有訂閱
              </Typography>
              <Typography
                variant="h5"
                sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}
              >
                不再為各種訂閱服務煩惱，一個平台統一管理，節省時間與金錢
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setAuthDialogOpen(true)}
                  sx={{
                    backgroundColor: "white",
                    color: "#6d4eff",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  立即開始使用
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  href="#features"
                >
                  了解更多
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  平台統計
                </Typography>
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ textAlign: "center", py: 2 }}>
                        <Typography variant="h4" fontWeight={700}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }} id="features">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            為什麼選擇我們？
          </Typography>
          <Typography variant="h6" color="text.secondary">
            專為忙碌現代人設計的訂閱管理工具
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(109, 78, 255, 0.15)",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: "#6d4eff", mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ backgroundColor: "white", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                更聰明的訂閱管理方式
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                現代人平均擁有 12 個以上的訂閱服務，每年花費超過 NT$20,000。
                但你知道嗎？其中有 30% 的訂閱是不必要的或已經忘記取消的。
              </Typography>
              <Stack spacing={2} sx={{ mt: 4 }}>
                {[
                  "一鍵查看所有訂閱服務",
                  "自動計算總開支，掌握預算",
                  "到期提醒，不浪費每一分錢",
                  "品牌圖標自動識別",
                  "支援多種貨幣",
                  "資料安全加密存儲",
                ].map((benefit, index) => (
                  <Stack direction="row" spacing={1} key={index}>
                    <CheckCircle sx={{ color: "#6d4eff" }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: "#f7f7fb",
                  borderRadius: 4,
                  p: 4,
                  border: "2px solid #e5e5ef",
                }}
              >
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  開始使用超簡單
                </Typography>
                <Stack spacing={3} sx={{ mt: 3 }}>
                  {[
                    { step: "1", title: "註冊帳號", desc: "使用 Email 快速註冊" },
                    { step: "2", title: "新增訂閱", desc: "輸入訂閱資訊或自動識別" },
                    { step: "3", title: "開始管理", desc: "查看儀表板，掌控開支" },
                  ].map((item) => (
                    <Stack direction="row" spacing={2} key={item.step}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          backgroundColor: "#6d4eff",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {item.step}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            常見問題
          </Typography>
          <Typography variant="h6" color="text.secondary">
            有疑問嗎？我們為你準備了答案
          </Typography>
        </Box>
        <Stack spacing={2}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                boxShadow: "none",
                border: "1px solid #e5e5ef",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6" fontWeight={600}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6d4eff 0%, #a78bfa 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            準備好開始了嗎？
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            加入數千位用戶，立即掌控你的訂閱開支
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setAuthDialogOpen(true)}
            sx={{
              backgroundColor: "white",
              color: "#6d4eff",
              px: 6,
              py: 2,
              fontSize: "1.2rem",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            免費開始使用
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#1a1a1a", color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                訂閱管理平台
              </Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                輕鬆管理你的所有訂閱服務，節省時間與金錢
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                spacing={4}
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
              >
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    產品
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.7)"
                    sx={{ cursor: "pointer" }}
                  >
                    功能
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.7)"
                    sx={{ cursor: "pointer" }}
                  >
                    價格
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    關於
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.7)"
                    sx={{ cursor: "pointer" }}
                  >
                    團隊
                  </Typography>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.7)"
                    sx={{ cursor: "pointer" }}
                  >
                    聯絡我們
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", mt: 4, pt: 4 }}>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.5)" textAlign="center">
              © 2025 訂閱管理平台. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </Box>
  );
};

export default Landing;
